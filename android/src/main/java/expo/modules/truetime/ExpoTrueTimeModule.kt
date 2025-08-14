package expo.modules.truetime

import android.os.SystemClock
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.DatagramPacket
import java.net.DatagramSocket
import java.net.InetAddress
import java.nio.ByteBuffer
import java.nio.ByteOrder
import java.util.*

class ExpoTrueTimeModule : Module() {
    private var baseUtcTimeMillis: Long? = null
    private var baseElapsedRealtime: Long? = null
    override fun definition() = ModuleDefinition {
        Name("ExpoTrueTime")

        Function("setBaseUtcTime") { utcTimeMillis: Long ->
            baseUtcTimeMillis = utcTimeMillis
            baseElapsedRealtime = SystemClock.elapsedRealtime()
        }

        Function("getEstimatedTimeUtc") {
            val baseTime = baseUtcTimeMillis
            val baseUptime = baseElapsedRealtime

            if (baseTime == null || baseUptime == null) return@Function null

            val currentUptime = SystemClock.elapsedRealtime()
            val elapsed = currentUptime - baseUptime
            val estimatedTimeMillis = baseTime + elapsed

            // ISO 8601 UTC String döndür
            java.time.Instant.ofEpochMilli(estimatedTimeMillis).toString()
        }

        Function("getNtpTime") {
            return@Function getNtpTime()
        }

        Function("getNtpTimeMs") {
            return@Function getNtpTimeMs() // returns Long? → JS tarafında ms olarak alınır
        }

        Function("getUpTime") {
            return@Function getUpTime()
        }


    }

    private fun getUpTime(): Long {
        return SystemClock.elapsedRealtime()
    }

    private fun getNtpTime(): String {
        val address = InetAddress.getByName("time.google.com")
        val buffer = ByteArray(48)
        buffer[0] = 0b00100011 // NTP mode 3 (client), version 4

        val socket = DatagramSocket()
        socket.soTimeout = 10000
        val request = DatagramPacket(buffer, buffer.size, address, 123)
        socket.send(request)

        val response = DatagramPacket(buffer, buffer.size)
        socket.receive(response)
        socket.close()

        val transmitTimeSeconds = read32(buffer, 40)
        val transmitTimeFraction = read32(buffer, 44)

        val msb = transmitTimeSeconds - 2208988800L
        val fraction = transmitTimeFraction / 4294967296.0
        val time = (msb + fraction) * 1000.0

        return Date(time.toLong()).toInstant().toString()
    }

    private fun read32(buffer: ByteArray, offset: Int): Long {
        val bb = ByteBuffer.wrap(buffer, offset, 4)
        bb.order(ByteOrder.BIG_ENDIAN)
        return bb.int.toLong() and 0xffffffffL
    }

    private fun getNtpTimeMs(host: String = "time.google.com"): Long? {
        return try {
            val buffer = ByteArray(48)
            buffer[0] = 0b11100011.toByte() // NTP mode 3 (client)

            val address = InetAddress.getByName(host)
            val socket = DatagramSocket()
            socket.soTimeout = 3000

            val request = DatagramPacket(buffer, buffer.size, address, 123)
            socket.send(request)

            val response = DatagramPacket(buffer, buffer.size)
            socket.receive(response)
            socket.close()

            // Extract transmit timestamp (bytes 40..43)
            val transmitTimeSeconds = ByteBuffer.wrap(buffer, 40, 4)
                .order(ByteOrder.BIG_ENDIAN)
                .int.toLong() and 0xFFFFFFFFL

            // Convert seconds since 1900 to milliseconds since 1970 (Unix epoch)
            val epochOffset = 2208988800L
            val unixTimeSeconds = transmitTimeSeconds - epochOffset
            unixTimeSeconds * 1000L
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
}
