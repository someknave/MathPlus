package commonMain
import kotlin.math.*

interface MyNumber<T> {
    operator fun plus(other: MyNumber<T>): MyNumber<T>
    operator fun unaryMinus(): MyNumber<T>
    operator fun minus(other: MyNumber<T>): MyNumber<T>
    operator fun times(other: MyNumber<T>): MyNumber<T>
    operator fun div(other: MyNumber<T>): MyNumber<T>
    operator fun compareTo(other: MyNumber<T>): Int
    operator fun times(other: Int): MyNumber<T>
    fun absSq() = this * conj()
    fun abs() = this.max(-this)
    fun absDouble() = this.abs().toRootable().toMyDouble()
    fun myVal(int: Int): MyNumber<T>
    fun conj() = this
    fun max(other: MyNumber<T>) = if (this >= other) this else other
    fun min(other: MyNumber<T>) = if (this <= other) this else other
    fun sqrt(): MyNumber<T>
    fun pow(int: Int): MyNumber<T> {
        var ans = this.myVal(0)
        for (i in 0 until int) {
            ans *= this
        }
        return ans
    }
    fun toInvertible(): Invertible<*>
    fun toRootable(): Rootable<*>
    fun getSign() = if(this >= myVal(0)) {myVal(1)} else {-myVal(1)}

}
interface Invertible<T>: MyNumber<T> {
    fun invert() = myVal(1) / this
}
interface Rootable<T>: Invertible<T> {
    override fun sqrt() = pow(Fraction.HALF)
    fun pow(num: Rootable<T>): Rootable<T>
    fun pow(num: Invertible<Fraction>): Rootable<T>
    operator fun times(other: Double): Rootable<T>
    fun toMyDouble(): Rootable<MyDouble>
}
interface Algebraic<T>: Rootable<T> {

}

class MyInt(val value: Int = 0): MyNumber<MyInt> {
    override fun plus(other: MyNumber<MyInt>) = MyInt(value + (other as MyInt).value) as MyNumber<MyInt>
    override fun unaryMinus() = MyInt(-value) as MyNumber<MyInt>
    override fun minus(other: MyNumber<MyInt>) = MyInt(value - (other as MyInt).value) as MyNumber<MyInt>
    override fun times(other: MyNumber<MyInt>) = MyInt(value * (other as MyInt).value) as MyNumber<MyInt>
    override fun div(other: MyNumber<MyInt>) = MyInt(value / (other as MyInt).value) as MyNumber<MyInt>
    override fun toString() = value.toString()
    override fun equals(other: Any?): Boolean {
        return when (other) {
            is MyInt -> value == other.value
            is Int -> value == other
            else -> false
        }

    }
    override fun compareTo(other: MyNumber<MyInt>) = value.compareTo((other as MyInt).value)
    override fun myVal(int: Int) = MyInt(int) as MyNumber<MyInt>
    fun toFraction() = Fraction.Builder().build(value.toLong(), 1L)
    override fun toInvertible() = toFraction()
    override fun toRootable() = MyDouble(value.toDouble()) as Rootable<MyDouble>
    override fun times(other: Int) = MyInt(value * other)
    override fun sqrt() = MyInt(ceil(sqrt(value.toDouble())).toInt())
}
class MyLong(val value: Long = 0L): MyNumber<MyLong> {
    override fun plus(other: MyNumber<MyLong>) = MyLong(value + (other as MyLong).value) as MyNumber<MyLong>
    override fun unaryMinus() = MyLong(-value) as MyNumber<MyLong>
    override fun minus(other: MyNumber<MyLong>) = MyLong(value - (other as MyLong).value) as MyNumber<MyLong>
    override fun times(other: MyNumber<MyLong>) = MyLong(value * (other as MyLong).value) as MyNumber<MyLong>
    override fun div(other: MyNumber<MyLong>) = MyLong(value / (other as MyLong).value) as MyNumber<MyLong>
    override fun toString() = value.toString()
    override fun equals(other: Any?): Boolean {
        return when (other) {
            is MyLong -> value == other.value
            is Long -> value == other
            else -> false
        }
    }
    override fun compareTo(other: MyNumber<MyLong>) = value.compareTo((other as MyLong).value)
    override fun myVal(int: Int) = MyLong(int.toLong())  as MyNumber<MyLong>
    fun toFraction() = Fraction.Builder().build(value, 1L)
    override fun toInvertible() = toFraction()
    override fun toRootable() = MyDouble(value.toDouble()) as Rootable<MyDouble>
    override fun times(other: Int) = MyLong(value * other)
    override fun sqrt() = MyLong(ceil(sqrt(value.toDouble())).toLong())
}
class MyDouble(val value: Double = 0.0): Rootable<MyDouble> {
    override fun plus(other: MyNumber<MyDouble>) = MyDouble(value + (other as MyDouble).value) as Rootable<MyDouble>
    override fun unaryMinus() = MyDouble(-value) as Rootable<MyDouble>
    override fun minus(other: MyNumber<MyDouble>) = MyDouble(value - (other as MyDouble).value) as Rootable<MyDouble>
    override fun times(other: MyNumber<MyDouble>) = MyDouble(value * (other as MyDouble).value) as Rootable<MyDouble>
    override fun div(other: MyNumber<MyDouble>) = MyDouble(value / (other as MyDouble).value) as Rootable<MyDouble>
    override fun toString() = value.toString()
    override fun equals(other: Any?): Boolean {
        return when (other) {
            is MyDouble -> value == other.value
            is Double -> value == other
            else -> false
        }

    }
    override fun compareTo(other: MyNumber<MyDouble>) = value.compareTo((other as MyDouble).value)
    override fun myVal(int: Int) = MyDouble(int.toDouble()) as Rootable<MyDouble>
    override fun pow(num: Rootable<MyDouble>) = MyDouble(value.pow((num as MyDouble).value)) as Rootable<MyDouble>
    override fun toInvertible() = this
    override fun toRootable() = this
    override fun times(other: Int) = MyDouble(value * other)
    override fun times(other: Double) = MyDouble(value * other)
    override fun pow(num: Invertible<Fraction>) = MyDouble(value.pow((num as Fraction).value))
    override fun toMyDouble() = this as Rootable<MyDouble>
}
class Fraction private constructor(val num: Long = 0L, val div: Long = 1L, val value: Double = num.toDouble()/div): Invertible<Fraction> {
    companion object {
        val HALF = Builder().build(1L, 2L)
        val THIRD = Builder().build(1L, 3L)
        val QUARTER = Builder().build(1L, 4L)
        val TWO_THIRDS = Builder().build(2L, 3L)
        val THREE_QUARTERS = Builder().build(3L, 4L)
        val ONE = Builder().build(1L, 1L)
        val TWO = Builder().build(2L, 1L)
        val ZERO = Builder().build(0L, 1L)
    }
    data class Builder(var numerator: Long = 0L, var divisor: Long = 1L) {
        fun build(numerator: Long, divisor: Long): Invertible<Fraction> {
            if (divisor == 0L) {throw ArithmeticException("Cannot divide by Zero")}
            this.numerator = numerator
            this.divisor = divisor
            val gcd = gcd(numerator, divisor)
            val sign = sign(divisor.toDouble()).toLong()
            return Fraction(sign * numerator / gcd, sign * divisor / gcd)
        }
        private fun gcd(a: Long, b: Long): Long {
            return when {
                a == 0L -> abs(b)
                b == 0L -> abs(a)
                a == 1L || b == 1L -> 1L
                a % 2L == 0L && b % 2L == 0L -> 2L * gcd(a / 2, b / 2)
                a % 2L == 0L -> gcd(a / 2, b)
                b % 2L == 0L -> gcd(a, b / 2)
                else -> {
                    val x = abs(a)
                    val y = abs(b)
                    gcd(minOf(x, y), abs(x - y))
                }}}

    }
    override fun plus(other: MyNumber<Fraction>) =
        Builder().build(num * (other as Fraction).div + div * other.num, div * other.div)
    override fun unaryMinus() = Fraction(-num, div) as Invertible<Fraction>
    override fun minus(other: MyNumber<Fraction>) = this + -other
    override fun times(other: MyNumber<Fraction>) =
        Builder().build(num * (other as Fraction).num, div * other.div)
    override fun invert() = Builder().build(div, num)
    override fun div(other: MyNumber<Fraction>) = this * (other as Fraction).invert()
    override fun toString() = "$num / $div"
    override fun equals(other: Any?): Boolean {
        return when (other) {
            is Fraction -> num * other.div == div * other.num
            is Double -> value == other
            else -> false
        }
    }
    override fun compareTo(other: MyNumber<Fraction>) = value.compareTo((other as Fraction).value)
    override fun myVal(int: Int) = Fraction(int.toLong(), 1L) as Invertible<Fraction>
    override fun toInvertible() = this
    override fun toRootable() = MyDouble(value) as Rootable<MyDouble>
    override fun times(other: Int) = Builder().build(num * other, div)
    override fun sqrt(): Invertible<Fraction> {
        val newValue = sqrt(value)
        val newDiv = sqrt(div.toDouble()).roundToLong()
        val newNum = ceil(newValue * newDiv).toLong()
        return Fraction(newNum, newDiv, newValue)
    }
}
class Complex(val real: Double = 0.0, val image: Double = 0.0): Algebraic<Complex> {
    val abs  by lazy { (absDouble() as MyDouble).value }
    override fun plus(other: MyNumber<Complex>) = Complex(real + (other as Complex).real, image + other.image)
    override fun unaryMinus() = Complex(-real, -image)
    override fun minus(other: MyNumber<Complex>) = this + -other
    override operator fun times(other: Double) =
        Complex(real * other, image * other)
    operator fun div(scalar: Double) = this * (1/scalar)
    override fun times(other: MyNumber<Complex>) =
        Complex(real * (other as Complex).real - image * other.image, real * other.image + image * other.real)
    override fun conj() = Complex(real, -image)
    override fun invert() = this.conj() / (this * this.conj()).abs
    override fun div(other: MyNumber<Complex>) = this * (other as Complex).invert()
    override fun toString() = "$real + $image i"
    override fun equals(other: Any?): Boolean {
        return when (other) {
            is Complex -> real == other.real && image == other.image
            is Double -> real == other && image == 0.0
            else -> false
        }
    }
    override fun compareTo(other: MyNumber<Complex>) = abs.compareTo((other as Complex).abs)
    override fun abs() = Complex((this * conj()).real.pow(.5), 0.0) as Algebraic<Complex>
    override fun absDouble() = MyDouble((this * conj()).real.pow(.5)) as Rootable<MyDouble>
    override fun myVal(int: Int) = Complex(int.toDouble(), 0.0)
    fun toPolar(): Algebraic<Polar> {
        val theta = when {
            image == 0.0 && real >= 0.0 -> 0.0
            image == 0.0 -> PI
            real == 0.0 && image > 0.0 -> PI / 2
            real == 0.0 -> -PI / 2
            real > 0.0 -> atan(real / image)
            else -> atan(real / image) + PI
        }
        return Polar.Builder(abs, theta).build()
    }
    override fun pow(num: Rootable<Complex>) = ((this.toPolar() as Polar).pow(num as Complex) as Polar).toComplex()
    override fun toInvertible() = this
    override fun toRootable() = this
    override fun times(other: Int) = Complex(real * other, image * other)
    override fun pow(num: Invertible<Fraction>) = this.pow(Complex((num as Fraction).value, 0.0))
    override fun toMyDouble() = MyDouble(abs)
    override fun getSign(): Algebraic<Complex> {
        return if (real == 0.0 && image == 0.0) {
            Complex(1.0)
        } else {
            this / this.abs
        }
    }
}
class Polar private constructor(val r: Double, val theta: Double): Algebraic<Polar> {
    data class Builder(var r: Double, var theta: Double) {
        fun build(): Algebraic<Polar> {
            if (r < 0.0) {
                r = -r
                theta += PI
            }
            theta %= (PI * 2)
            if (theta > PI) theta -= (PI * 2)
            if (theta <= PI) theta += (PI * 2)
            return Polar(r, theta)
        }
    }
    override fun plus(other: MyNumber<Polar>): Algebraic<Polar> {
        when ((theta - (other as Polar).theta)) {
            0.0 -> return Polar(r + other.r, theta)
            PI, -PI -> return Builder(r - other.r, theta).build()
            else -> return ((toComplex() + other.toComplex()) as Complex).toPolar()
        }
    }
    override fun unaryMinus() = Builder(r, theta + PI).build()
    override fun minus(other: MyNumber<Polar>) =  this + -other
    override fun times(other: MyNumber<Polar>) = Builder(r * (other as Polar).r, theta + other.theta).build()
    override fun div(other: MyNumber<Polar>) = Builder(r / (other as Polar).r, theta - other.theta).build()
    override fun compareTo(other: MyNumber<Polar>) = r.compareTo((other as Polar).r)
    override fun myVal(int: Int) = Builder(int.toDouble(), 0.0).build()
    override fun pow(num: Rootable<Polar>) = this.pow((num as Polar).toComplex() as Complex)
    override fun conj() = Builder(r, PI - theta).build()
    fun pow(num: Complex): Algebraic<Polar> {
        val ln = ln(r)
        val exp = num.real * ln - num.image * theta
        val newTheta = num.image * ln + num.real * theta
        return Builder(exp(exp), newTheta).build()
    }
    fun toComplex() = Complex(r * cos(theta), r * sin(theta)) as Algebraic<Complex>
    override fun toInvertible() = this
    override fun toRootable() = this
    override fun abs() = Polar(r, 0.0)
    override fun absDouble() = MyDouble(r) as Rootable<MyDouble>
    override fun times(other: Int) = Builder(r * other, theta).build()
    override fun times(other: Double) = Builder(r * other, theta).build()
    override fun toMyDouble() = MyDouble(r) as Rootable<MyDouble>
    override fun pow(num: Invertible<Fraction>): Rootable<Polar> {
        val power = (num as Fraction).value
        return Builder(r.pow(power), theta * power).build()
    }
}





