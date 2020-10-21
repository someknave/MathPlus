package commonMain

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
        fun <T: MyNumber<T>> identity (seed: MyNumber<T>, width: Int, height: Int = width): Matrix<T> {
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
    operator fun times(other: MyNumber<T>): Matrix<T> {
        val newData = List(height) { j -> List(width) {
                i -> other * values[j][i]
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
@Suppress("UNCHECKED_CAST")
fun <T: Invertible<T>> Matrix<T>.inverse(): Matrix<T>? {
    val mat = coFactorMatrix()
    if (mat == null || det == this.zero || det == null) return null
    return mat.transpose() / (det as T)
}
operator fun <T: Invertible<T>> Matrix<T>.div(scalar: T) = this * (scalar.invert())

fun <T: Rootable<T>> Matrix<T>.factorQR(): Pair<Matrix<T>, Matrix<T>> {
    val seed = this.one
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

fun Matrix<MyInt>.toInvertible(): Matrix<Fraction> {
    val newValues = List(height) { j -> Vector(List(width) {
            i ->
        (this.getIndexed(i, j) as MyInt).toFraction()
    })}
    return Matrix.Builder().rows(newValues)
}
fun Matrix<MyLong>.toInvertible(): Matrix<Fraction> {
    val newValues = List(height) { j -> Vector(List(width) {
            i ->
        (this.getIndexed(i, j) as MyLong).toFraction()
    })}
    return Matrix.Builder().rows(newValues)
}
fun <T: Invertible<T>> Matrix<T>.toInvertible() = this