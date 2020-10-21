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
    val abs  by lazy { (abs() as Complex).real }
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
    override fun getSign(): Algebraic<Complex> {
        return if (real == 0.0 && image == 0.0) {
            Complex(1.0)
        } else {
            this / this.abs
        }
    }

    override fun toMyDouble() = MyDouble(abs)
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
    override fun pow(num: Invertible<Fraction>): Rootable<Polar> {
        val power = (num as Fraction).value
        return Builder(r.pow(power), theta * power).build()
    }

    override fun toMyDouble() = MyDouble(r) as Rootable<MyDouble>
}
@Suppress("UNCHECKED_CAST")
class Vector<T: MyNumber<T>>(private val values: List<MyNumber<T>>) {
    data class Builder<T: MyNumber<T>>(var values: List<MyNumber<T>>) {
        fun build() = Vector(values)
    }
    val size = values.size
    fun getOrNull(i: Int): MyNumber<T>? {
        if (i in values.indices) return values[i]
        return null
    }
    fun get(i: Int) = values[i]
    operator fun plus(other: Vector<T>): Vector<T>? {
        if (size == other.size) {
            val list = List(size) { i -> values[i] + other.get(i)}
            return Vector(list)
        }
        return null
    }
    operator fun times(other: Vector<T>): MyNumber<T>? {
        if (size == other.size) {
            val list = List(size) { i -> values[i] * other.get(i)}
            return list.fold(list[0].myVal(0)) { acc, i -> acc + i}
        }
        return null
    }
    operator fun unaryMinus(): Vector<T> {
        val list = List(size) { i -> -values[i]}
        return Vector(list)
    }
    operator fun minus(other: Vector<T>) = this + -other
    operator fun times(scalar: T): Vector<T> {
        val list = List(size) { i -> scalar * values[i]}
        return Vector(list)
    }
    operator fun times(matrix: Matrix<T>): Vector<T>? {
        if (size == matrix.height) {
            val list = List(matrix.width) { i -> (this * matrix.getCol(i))!!}
            return Vector(list)
        }
        return null
    }
    fun xMult(other: Vector<T>): Matrix<T> {
        val zero = get(0).myVal(0)
        val one = zero.myVal(1)
        val values = List(size) { j -> List(other.size) {
                i -> (other.get(i) * get(j)) as T
        }}
        return Matrix.Builder().build(other.size, size, zero, one, values)
    }
    fun subVector(start: Int, end: Int = size - 1): Vector<T> {
        val list = values.subList(start, end)
        return Vector(list)
    }
    fun toMatrix(vertical: Boolean = true): Matrix<T> {
        if (vertical) return Matrix.Builder().columns(listOf(this))
        return Matrix.Builder().rows(listOf(this))
    }
    fun isZeros(): Boolean {
        val zero = get(0).myVal(0)
        for (i in 0 until size) {
            if (get(i) != zero) return false
        }
        return true
    }
    fun conjugate(): Vector<T> {
        if (values[0] !is Complex) return this
        val list = values.map { it.conj()}
        return Vector(list)
    }
    fun absSqr(): MyNumber<T> {
        return values.map { it.absSq() }.reduce { acc, it -> acc + it}
    }
    fun norm1(): MyNumber<T> {
        return values.map { it.abs() }.reduce { acc, it -> acc + it}
    }
    fun normInf(): MyNumber<T> {
        return values.map { it.abs() }.reduce { acc, it -> acc.max(it)}
    }
    fun norm2() = absSqr().sqrt()
    fun norm2Double() = absSqr().absDouble().pow(Fraction.HALF)
    fun toHhReflector(): Matrix<T> {
        val scalar = absSqr() / values[0].myVal(2)
        val one = scalar.myVal(1)
        val invertible = scalar is Invertible<T>
        val vectors = List(size) { j -> Vector(List(size) {
                i -> when {
            invertible && i == j -> one - values[j] * values[i].conj() / scalar
            invertible -> -values[j] * values[i].conj() / scalar
            i == j -> scalar - values[j] * values[i].conj()
            else -> -values[j] * values[i].conj()
        }})}
        return Matrix.Builder().rows(vectors)
    }
}

class Matrix<T: MyNumber<T>> private constructor(val width: Int, val height: Int,
                                                 val zero: MyNumber<T>, val one: MyNumber<T>,
                                                 private val values: List<List<MyNumber<T>>>) {
    data class Builder(var width: Int = 0, var height: Int = 0) {
        fun parameters(width: Int,  height: Int) {
            this.width = width
            this.height = height
        }
        fun <T: MyNumber<T>> rows(vectors: List<Vector<T>>): Matrix<T> {
            val newVectors = vectors.filter { it.size != 0 }
            val zero = newVectors[0].get(0).myVal(0)
            val one = zero.myVal(1)
            val width = newVectors.map { it.size }.maxByOrNull { it } ?: 0
            val height = newVectors.size
            val values = List(height) { j -> List(width) {
                    i -> newVectors[j].getOrNull(i) ?: zero
            }}
            return Matrix(width, height, zero, one, values)
        }
        fun <T: MyNumber<T>> columns(vectors: List<Vector<T>>): Matrix<T> {
            val newVectors = vectors.filter { it.size != 0 }
            val zero = newVectors[0].get(0).myVal(0)
            val one = zero.myVal(1)
            val width = newVectors.size
            val height = newVectors.map { it.size }.maxByOrNull { it } ?: 0
            val values = List(height) { j -> List(width) {
                    i -> newVectors[i].getOrNull(j) ?: zero
            }}
            return Matrix(width, height, zero, one, values)
        }
        fun <T: MyNumber<T>> build(data: List<T>): Matrix<T> {
            val zero = data[0].myVal(0)
            val one = zero.myVal(1)
            val values = List(height) { j -> List(width) {
                    i -> data[(j * width + i) % data.size]
            }}
            return Matrix(width, height, zero, one, values)
        }
        fun <T: MyNumber<T>> build(width: Int, height: Int, zero: MyNumber<T>,
                                   one: MyNumber<T>, values: List<List<T>>): Matrix<T> {
            return Matrix(width, height, zero, one, values)
        }
        fun <T: MyNumber<T>> identity (seed: T, width: Int, height: Int = width): Matrix<T> {
            val one = seed.myVal(1)
            val zero = seed.myVal(0)
            val values = List(height) { j -> List(width) {
                    i -> if (i == j) one else zero
            }}
            return Matrix(width, height, zero, one, values)
        }
    }
    val det by lazy { this.determinant() }
    fun getRow(j: Int): Vector<T> {
        return Vector.Builder(values[j]).build()
    }
    fun getRowOrNull(j: Int): Vector<T>? {
        if (j in 0 until height) {
            return getRow(j)
        }
        return null
    }
    fun getCol(i: Int): Vector<T> {
        val list = List(height) { j -> values[j][i]}
        return Vector.Builder(list).build()
    }
    fun getColOrNull(i: Int): Vector<T>? {
        if (i in 0 until width) {
            return getCol(i)
        }
        return null
    }
    fun getIndexed(i: Int, j: Int): MyNumber<T> {
        return values[j][i]
    }
    fun invertibleMatrix(): Matrix<*> {
        val newZero = zero.toInvertible() as Invertible<*>
        val newOne = one.toInvertible() as Invertible<*>
        val newValues = List(height) { j -> List(width) {
                i -> getIndexed(i, j).toInvertible() as Invertible<*>
        }}
        return Matrix(width, height, newZero, newOne, newValues)
    }
    fun <W: Rootable<W>> rootableMatrix(): Matrix<W> {
        val newZero = zero.toInvertible() as Rootable<W>
        val newOne = one.toInvertible() as Rootable<W>
        val newValues = List(height) { j -> List(width) {
                i -> getIndexed(i, j).toInvertible() as Rootable<W>
        }}
        return Matrix(width, height, newZero, newOne, newValues)
    }
    operator fun plus(other: Matrix<T>): Matrix<T>? {
        if (width != other.width || height != other.height ) {
            return null
        }
        val newData = List(height) { j -> List(width) {
                i -> getIndexed(i, j).plus(other.getIndexed(i, j))
        }}
        return Matrix(width, height, zero, one, newData)
    }
    operator fun times(other: Matrix<T>): Matrix<T>? {
        if (width != other.height) {
            return null
        }
        val newData = List(height) { j -> List(other.width) {
                i -> (getRow(j) * other.getCol(i))!!
        }}
        return Matrix(other.width, height, zero, one, newData)
    }
    operator fun times(vector: Vector<T>): Vector<T>? {
        if (width == vector.size) {
            val list = List(height) { j -> (getRow(j) * vector)!!}
            return Vector.Builder(list).build()
        }
        return null
    }
    operator fun times(scalar: T): Matrix<T> {
        val newData = List(height) { j -> List(width) {
                i -> scalar * values[j][i]
        }}
        return Matrix(width, height, zero, one, newData)
    }
    fun conjugate(): Matrix<T> {
        val newValues = List(height) { j -> List(width) {
                i -> (this.getIndexed(i, j) as Invertible<T>).conj()  as T
        }}
        return Builder().build(width, height, zero, one, newValues)
    }
    fun transpose(): Matrix<T> {
        val newData = List(width) { i -> List(height) {
                j -> values[j][i]
        }}
        return Matrix(height, width, zero, one, newData)
    }
    fun getMinor(i: Int, j: Int): Matrix<T>? {
        if (i in 0 until width && j in 0 until height) {
            val newData = List(height - 1) { y ->
                List(width - 1) { x ->
                    when {
                        x < i && y < j -> values[y][x]
                        x < i -> values[y + 1][x]
                        y < j -> values[y][x + 1]
                        else -> values[y + 1][x + 1]
                    }
                }
            }
            return Matrix(width - 1, height - 1, zero, one, newData)
        }
        return null
    }
    fun determinant(): MyNumber<T>? {
        if (width != height) return null
        if (width == 1) return values[0][0]
        if (width == 2) return values[0][0] * values [1][1] - values[0][1] * values[1][0]
        var ans = values[0][0].myVal(0)
        for (i in 0 until width) {
            ans += (values[0][i] * coFactor(i, 0)!!)
        }
        return ans
    }
    fun coFactor(i: Int, j: Int): MyNumber<T>? {
        val positive = (i + j) % 2 == 0
        return if (positive) getMinor(i, j)?.determinant() else getMinor(i, j)?.determinant()?.unaryMinus()
    }
    fun coFactorMatrix(): Matrix<T>? {
        if (width != height) return null
        val newValues = List(height) { j -> List(width) { i -> coFactor(i, j)!! as T}}
        return Builder().build(width, height, zero, one, newValues)
    }
    override fun toString(): String {
        var string = ""
        for (j in 0 until height) {
            string += getRowOrNull(j)?.toString() + "\n"
        }
        return string
    }
    operator fun unaryMinus(): Matrix<T> {
        val newValues = List(height) { j -> List(width) { i -> -values[j][i]}}
        return Matrix(width, height, zero, one, newValues)
    }
    operator fun minus(other: Matrix<T>): Matrix<T>? {
        return this + -other
    }
    fun normF(): MyNumber<T> {
        var sum = zero
        for (i in 0 until width) {
            sum += getCol(i).absSqr()
        }
        return sum.sqrt()
    }
    fun norm1(): MyNumber<T> {
        var ans = zero
        for (i in 0 until width) {
            ans = ans.max(getCol(i).norm1())
        }
        return ans
    }
    fun norm2(): MyNumber<T> {
        TODO()
    }
    fun normInf(): MyNumber<T> {
        var ans = zero
        for (j in 0 until height) {
            ans = ans.max(getRow(j).norm1())
        }
        return ans
    }
    fun getHh(col: Int, index: Int = col): Pair<Vector<T>, MyNumber<T>> {
        val invertible = one is Invertible<T>
        val x = getCol(col).subVector(index)
        val x0 = x.get(0)
        val sign = x0.getSign()
        val mag = x.norm2()
        val v0 = x0 + sign * mag
        val list = if (invertible) { List(x.size) {
                i -> if (i == 0) {one} else { x.get(i) / v0}
        }} else {List(x.size) {
                i -> if (i == 0) {v0} else { x.get(i)}
        }}
        return Pair(Vector(list), sign * mag)
    }
}

fun <T: Invertible<T>> Matrix<T>.inverse(): Matrix<T>? {
    val mat = coFactorMatrix()
    if (mat == null || det == this.zero) return null
    return mat.transpose() / (det as T)
}
operator fun <T: Invertible<T>> Matrix<T>.div(scalar: T) = this * (scalar.invert() as T)
fun <T: Invertible<T>> Matrix<T>.pseudoInverse(): Matrix<T>? {
    val mat = coFactorMatrix()
    if (mat == null || det == this.zero) return null
    return mat.transpose() / (det as T)
}
fun <T: Rootable<T>> Matrix<T>.factorQR(): Pair<Matrix<T>, Matrix<T>> {
    val seed = this.one as T
    var matR = this
    var matQ = Matrix.Builder().identity(seed, height)
    val hhVectors = mutableMapOf<Vector<T>, Pair<Vector<T>, MyNumber<T>>>()
    for (index in 0 until matR.width) {
        if (index == matR.height - 1) break
        val houseHolder = matR.getHh(index)
        val herm = houseHolder.first.conjugate()
        val scaleFactor = herm.absSqr() / seed.myVal(2)
        hhVectors.plus(houseHolder.first to (herm to scaleFactor))
        val row = Vector(List(herm.size) { i ->
            herm.times(matR.getCol(index + i).subVector(index))!! / scaleFactor
        })
        val newValues = List(matR.height) { j -> Vector(List(matR.width) {
                i -> when {
            i < index || j < index -> matR.getIndexed(i, j)
            j == index && i == index -> matR.getIndexed(i, j) - houseHolder.second
            j == index -> zero
            i == index -> matR.getIndexed(i, j) - row.get(j - index)
            else -> matR.getIndexed(i, j) - houseHolder.first.get(i - index) * row.get(j - index)
        }})}
        matR = Matrix.Builder().rows(newValues)
    }
    val vectors = hhVectors.keys.reversed()
    for (vector in vectors) {
        val index = matQ.width - vector.size
        val (herm,  scaleFactor) = hhVectors[vector]!!
        val row = Vector(List(vector.size) { i ->
            herm.times(matQ.getCol(i))!!/ scaleFactor
        })
        val newValues = List(matQ.height) { j -> Vector(List(matQ.width) {
                i -> when {
            i < index || j < index -> matQ.getIndexed(i, j)
            j == index && i == index -> one - one/scaleFactor
            j == index -> -vector.get(i - index)/scaleFactor
            i == index -> -row.get(j - index)
            else -> matQ.getIndexed(i, j) - vector.get(i - index) * row.get(j - index)
        }})}
        matQ = Matrix.Builder().rows(newValues)
    }
    return matQ to matR
}

fun Matrix<MyInt>.convert(): Matrix<Fraction> {
    val newValues = List(height) { j -> Vector(List(width) {
            i -> (this.getIndexed(i, j) as MyInt).toFraction() as Invertible<Fraction>
    })}
    return Matrix.Builder().rows(newValues)
}
fun Matrix<MyLong>.convert(): Matrix<Fraction> {
    val newValues = List(height) { j -> Vector(List(width) {
            i -> (this.getIndexed(i, j) as MyLong).toFraction() as Invertible<Fraction>
    })}
    return Matrix.Builder().rows(newValues)
}