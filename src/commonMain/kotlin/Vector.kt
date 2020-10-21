package commonMain

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
    @Suppress("UNCHECKED_CAST")
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