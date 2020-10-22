(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', 'kotlin'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('kotlin'));
  else {
    if (typeof kotlin === 'undefined') {
      throw new Error("Error loading module 'MathPlus'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'MathPlus'.");
    }root.MathPlus = factory(typeof MathPlus === 'undefined' ? {} : MathPlus, kotlin);
  }
}(this, function (_, Kotlin) {
  'use strict';
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var throwCCE = Kotlin.throwCCE;
  var L1 = Kotlin.Long.ONE;
  var numberToInt = Kotlin.numberToInt;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var equals = Kotlin.equals;
  var L0 = Kotlin.Long.ZERO;
  var L2 = Kotlin.Long.fromInt(2);
  var L3 = Kotlin.Long.fromInt(3);
  var L4 = Kotlin.Long.fromInt(4);
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var ArithmeticException = Kotlin.kotlin.ArithmeticException;
  var abs = Kotlin.kotlin.math.abs_s8cxhz$;
  var roundToLong = Kotlin.kotlin.math.roundToLong_yrwdxr$;
  var math = Kotlin.kotlin.math;
  var lazy = Kotlin.kotlin.lazy_klfg04$;
  var Math_0 = Math;
  var ensureNotNull = Kotlin.ensureNotNull;
  var Pair = Kotlin.kotlin.Pair;
  var to = Kotlin.kotlin.to_ujzrz7$;
  var plus = Kotlin.kotlin.collections.plus_e8164j$;
  var reversed = Kotlin.kotlin.collections.reversed_7wnvza$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var ArrayList_init_0 = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  var NotImplementedError_init = Kotlin.kotlin.NotImplementedError;
  var LinkedHashMap_init = Kotlin.kotlin.collections.LinkedHashMap_init_q3lmfv$;
  var get_indices = Kotlin.kotlin.collections.get_indices_gzk92b$;
  var listOf = Kotlin.kotlin.collections.listOf_mh5how$;
  var UnsupportedOperationException_init = Kotlin.kotlin.UnsupportedOperationException_init_pdl1vj$;
  function MyNumber() {
  }
  MyNumber.prototype.absSq = function () {
    return this.times_qzel40$(this.conj());
  };
  MyNumber.prototype.abs = function () {
    return this.max_qzel40$(this.unaryMinus());
  };
  MyNumber.prototype.absDouble = function () {
    return this.abs().toRootable().toMyDouble();
  };
  MyNumber.prototype.conj = function () {
    return this;
  };
  MyNumber.prototype.max_qzel40$ = function (other) {
    return this.compareTo_qzel40$(other) >= 0 ? this : other;
  };
  MyNumber.prototype.min_qzel40$ = function (other) {
    return this.compareTo_qzel40$(other) <= 0 ? this : other;
  };
  MyNumber.prototype.pow_za3lpa$ = function (int) {
    var ans = this.myVal_za3lpa$(0);
    for (var i = 0; i < int; i++) {
      ans = ans.times_qzel40$(this);
    }
    return ans;
  };
  MyNumber.prototype.getSign = function () {
    if (this.compareTo_qzel40$(this.myVal_za3lpa$(0)) >= 0) {
      return this.myVal_za3lpa$(1);
    } else {
      return this.myVal_za3lpa$(1).unaryMinus();
    }
  };
  MyNumber.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'MyNumber',
    interfaces: []
  };
  function Invertible() {
  }
  Invertible.prototype.invert = function () {
    return this.myVal_za3lpa$(1).div_qzel40$(this);
  };
  Invertible.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'Invertible',
    interfaces: [MyNumber]
  };
  function Rootable() {
  }
  Rootable.prototype.sqrt = function () {
    return this.pow_s165k8$(Fraction$Companion_getInstance().HALF);
  };
  Rootable.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'Rootable',
    interfaces: [Invertible]
  };
  function Algebraic() {
  }
  Algebraic.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'Algebraic',
    interfaces: [Rootable]
  };
  function MyInt(value) {
    if (value === void 0)
      value = 0;
    this.value = value;
  }
  MyInt.prototype.plus_qzel40$ = function (other) {
    var tmp$, tmp$_0;
    return Kotlin.isType(tmp$_0 = new MyInt(this.value + (Kotlin.isType(tmp$ = other, MyInt) ? tmp$ : throwCCE()).value | 0), MyNumber) ? tmp$_0 : throwCCE();
  };
  MyInt.prototype.unaryMinus = function () {
    var tmp$;
    return Kotlin.isType(tmp$ = new MyInt(-this.value | 0), MyNumber) ? tmp$ : throwCCE();
  };
  MyInt.prototype.minus_qzel40$ = function (other) {
    var tmp$, tmp$_0;
    return Kotlin.isType(tmp$_0 = new MyInt(this.value - (Kotlin.isType(tmp$ = other, MyInt) ? tmp$ : throwCCE()).value | 0), MyNumber) ? tmp$_0 : throwCCE();
  };
  MyInt.prototype.times_qzel40$ = function (other) {
    var tmp$, tmp$_0;
    return Kotlin.isType(tmp$_0 = new MyInt(Kotlin.imul(this.value, (Kotlin.isType(tmp$ = other, MyInt) ? tmp$ : throwCCE()).value)), MyNumber) ? tmp$_0 : throwCCE();
  };
  MyInt.prototype.div_qzel40$ = function (other) {
    var tmp$, tmp$_0;
    return Kotlin.isType(tmp$_0 = new MyInt(this.value / (Kotlin.isType(tmp$ = other, MyInt) ? tmp$ : throwCCE()).value | 0), MyNumber) ? tmp$_0 : throwCCE();
  };
  MyInt.prototype.toString = function () {
    return this.value.toString();
  };
  MyInt.prototype.equals = function (other) {
    var tmp$;
    if (Kotlin.isType(other, MyInt))
      tmp$ = this.value === other.value;
    else if (typeof other === 'number')
      tmp$ = this.value === other;
    else
      tmp$ = false;
    return tmp$;
  };
  MyInt.prototype.compareTo_qzel40$ = function (other) {
    var tmp$;
    return Kotlin.primitiveCompareTo(this.value, (Kotlin.isType(tmp$ = other, MyInt) ? tmp$ : throwCCE()).value);
  };
  MyInt.prototype.myVal_za3lpa$ = function (int) {
    var tmp$;
    return Kotlin.isType(tmp$ = new MyInt(int), MyNumber) ? tmp$ : throwCCE();
  };
  MyInt.prototype.toFraction = function () {
    return (new Fraction$Builder()).build_3pjtqy$(Kotlin.Long.fromInt(this.value), L1);
  };
  MyInt.prototype.toInvertible = function () {
    return this.toFraction();
  };
  MyInt.prototype.toRootable = function () {
    var tmp$;
    return Kotlin.isType(tmp$ = new MyDouble(this.value), Rootable) ? tmp$ : throwCCE();
  };
  MyInt.prototype.times_za3lpa$ = function (other) {
    return new MyInt(Kotlin.imul(this.value, other));
  };
  MyInt.prototype.sqrt = function () {
    var x = this.value;
    var x_0 = Math_0.sqrt(x);
    return new MyInt(numberToInt(Math_0.ceil(x_0)));
  };
  MyInt.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'MyInt',
    interfaces: [MyNumber]
  };
  function MyLong(value) {
    if (value === void 0)
      value = L0;
    this.value = value;
  }
  MyLong.prototype.plus_qzel40$ = function (other) {
    var tmp$, tmp$_0;
    return Kotlin.isType(tmp$_0 = new MyLong(this.value.add((Kotlin.isType(tmp$ = other, MyLong) ? tmp$ : throwCCE()).value)), MyNumber) ? tmp$_0 : throwCCE();
  };
  MyLong.prototype.unaryMinus = function () {
    var tmp$;
    return Kotlin.isType(tmp$ = new MyLong(this.value.unaryMinus()), MyNumber) ? tmp$ : throwCCE();
  };
  MyLong.prototype.minus_qzel40$ = function (other) {
    var tmp$, tmp$_0;
    return Kotlin.isType(tmp$_0 = new MyLong(this.value.subtract((Kotlin.isType(tmp$ = other, MyLong) ? tmp$ : throwCCE()).value)), MyNumber) ? tmp$_0 : throwCCE();
  };
  MyLong.prototype.times_qzel40$ = function (other) {
    var tmp$, tmp$_0;
    return Kotlin.isType(tmp$_0 = new MyLong(this.value.multiply((Kotlin.isType(tmp$ = other, MyLong) ? tmp$ : throwCCE()).value)), MyNumber) ? tmp$_0 : throwCCE();
  };
  MyLong.prototype.div_qzel40$ = function (other) {
    var tmp$, tmp$_0;
    return Kotlin.isType(tmp$_0 = new MyLong(this.value.div((Kotlin.isType(tmp$ = other, MyLong) ? tmp$ : throwCCE()).value)), MyNumber) ? tmp$_0 : throwCCE();
  };
  MyLong.prototype.toString = function () {
    return this.value.toString();
  };
  MyLong.prototype.equals = function (other) {
    var tmp$;
    if (Kotlin.isType(other, MyLong))
      tmp$ = equals(this.value, other.value);
    else if (Kotlin.isType(other, Kotlin.Long))
      tmp$ = equals(this.value, other);
    else
      tmp$ = false;
    return tmp$;
  };
  MyLong.prototype.compareTo_qzel40$ = function (other) {
    var tmp$;
    return this.value.compareTo_11rb$((Kotlin.isType(tmp$ = other, MyLong) ? tmp$ : throwCCE()).value);
  };
  MyLong.prototype.myVal_za3lpa$ = function (int) {
    var tmp$;
    return Kotlin.isType(tmp$ = new MyLong(Kotlin.Long.fromInt(int)), MyNumber) ? tmp$ : throwCCE();
  };
  MyLong.prototype.toFraction = function () {
    return (new Fraction$Builder()).build_3pjtqy$(this.value, L1);
  };
  MyLong.prototype.toInvertible = function () {
    return this.toFraction();
  };
  MyLong.prototype.toRootable = function () {
    var tmp$;
    return Kotlin.isType(tmp$ = new MyDouble(this.value.toNumber()), Rootable) ? tmp$ : throwCCE();
  };
  MyLong.prototype.times_za3lpa$ = function (other) {
    return new MyLong(this.value.multiply(Kotlin.Long.fromInt(other)));
  };
  MyLong.prototype.sqrt = function () {
    var x = this.value.toNumber();
    var x_0 = Math_0.sqrt(x);
    return new MyLong(Kotlin.Long.fromNumber(Math_0.ceil(x_0)));
  };
  MyLong.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'MyLong',
    interfaces: [MyNumber]
  };
  function MyDouble(value) {
    if (value === void 0)
      value = 0.0;
    this.value = value;
  }
  MyDouble.prototype.plus_qzel40$ = function (other) {
    var tmp$, tmp$_0;
    return Kotlin.isType(tmp$_0 = new MyDouble(this.value + (Kotlin.isType(tmp$ = other, MyDouble) ? tmp$ : throwCCE()).value), Rootable) ? tmp$_0 : throwCCE();
  };
  MyDouble.prototype.unaryMinus = function () {
    var tmp$;
    return Kotlin.isType(tmp$ = new MyDouble(-this.value), Rootable) ? tmp$ : throwCCE();
  };
  MyDouble.prototype.minus_qzel40$ = function (other) {
    var tmp$, tmp$_0;
    return Kotlin.isType(tmp$_0 = new MyDouble(this.value - (Kotlin.isType(tmp$ = other, MyDouble) ? tmp$ : throwCCE()).value), Rootable) ? tmp$_0 : throwCCE();
  };
  MyDouble.prototype.times_qzel40$ = function (other) {
    var tmp$, tmp$_0;
    return Kotlin.isType(tmp$_0 = new MyDouble(this.value * (Kotlin.isType(tmp$ = other, MyDouble) ? tmp$ : throwCCE()).value), Rootable) ? tmp$_0 : throwCCE();
  };
  MyDouble.prototype.div_qzel40$ = function (other) {
    var tmp$, tmp$_0;
    return Kotlin.isType(tmp$_0 = new MyDouble(this.value / (Kotlin.isType(tmp$ = other, MyDouble) ? tmp$ : throwCCE()).value), Rootable) ? tmp$_0 : throwCCE();
  };
  MyDouble.prototype.toString = function () {
    return this.value.toString();
  };
  MyDouble.prototype.equals = function (other) {
    var tmp$;
    if (Kotlin.isType(other, MyDouble))
      tmp$ = this.value === other.value;
    else if (typeof other === 'number')
      tmp$ = this.value === other;
    else
      tmp$ = false;
    return tmp$;
  };
  MyDouble.prototype.compareTo_qzel40$ = function (other) {
    var tmp$;
    return Kotlin.compareTo(this.value, (Kotlin.isType(tmp$ = other, MyDouble) ? tmp$ : throwCCE()).value);
  };
  MyDouble.prototype.myVal_za3lpa$ = function (int) {
    var tmp$;
    return Kotlin.isType(tmp$ = new MyDouble(int), Rootable) ? tmp$ : throwCCE();
  };
  MyDouble.prototype.pow_qi8z6v$ = function (num) {
    var tmp$, tmp$_0, tmp$_1;
    tmp$_0 = this.value;
    var x = (Kotlin.isType(tmp$ = num, MyDouble) ? tmp$ : throwCCE()).value;
    return Kotlin.isType(tmp$_1 = new MyDouble(Math_0.pow(tmp$_0, x)), Rootable) ? tmp$_1 : throwCCE();
  };
  MyDouble.prototype.toInvertible = function () {
    return this;
  };
  MyDouble.prototype.toRootable = function () {
    return this;
  };
  MyDouble.prototype.times_za3lpa$ = function (other) {
    return new MyDouble(this.value * other);
  };
  MyDouble.prototype.times_14dthe$ = function (other) {
    return new MyDouble(this.value * other);
  };
  MyDouble.prototype.pow_s165k8$ = function (num) {
    var tmp$, tmp$_0;
    tmp$_0 = this.value;
    var x = (Kotlin.isType(tmp$ = num, Fraction) ? tmp$ : throwCCE()).value;
    return new MyDouble(Math_0.pow(tmp$_0, x));
  };
  MyDouble.prototype.toMyDouble = function () {
    var tmp$;
    return Kotlin.isType(tmp$ = this, Rootable) ? tmp$ : throwCCE();
  };
  MyDouble.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'MyDouble',
    interfaces: [Rootable]
  };
  function Fraction(num, div, value) {
    Fraction$Companion_getInstance();
    if (num === void 0)
      num = L0;
    if (div === void 0)
      div = L1;
    if (value === void 0)
      value = num.toNumber() / div.toNumber();
    this.num = num;
    this.div = div;
    this.value = value;
  }
  function Fraction$Companion() {
    Fraction$Companion_instance = this;
    this.HALF = (new Fraction$Builder()).build_3pjtqy$(L1, L2);
    this.THIRD = (new Fraction$Builder()).build_3pjtqy$(L1, L3);
    this.QUARTER = (new Fraction$Builder()).build_3pjtqy$(L1, L4);
    this.TWO_THIRDS = (new Fraction$Builder()).build_3pjtqy$(L2, L3);
    this.THREE_QUARTERS = (new Fraction$Builder()).build_3pjtqy$(L3, L4);
    this.ONE = (new Fraction$Builder()).build_3pjtqy$(L1, L1);
    this.TWO = (new Fraction$Builder()).build_3pjtqy$(L2, L1);
    this.ZERO = (new Fraction$Builder()).build_3pjtqy$(L0, L1);
  }
  Fraction$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Fraction$Companion_instance = null;
  function Fraction$Companion_getInstance() {
    if (Fraction$Companion_instance === null) {
      new Fraction$Companion();
    }return Fraction$Companion_instance;
  }
  function Fraction$Builder(numerator, divisor) {
    if (numerator === void 0)
      numerator = L0;
    if (divisor === void 0)
      divisor = L1;
    this.numerator = numerator;
    this.divisor = divisor;
  }
  Fraction$Builder.prototype.build_3pjtqy$ = function (numerator, divisor) {
    if (equals(divisor, L0)) {
      throw new ArithmeticException('Cannot divide by Zero');
    }this.numerator = numerator;
    this.divisor = divisor;
    var gcd = this.gcd_0(numerator, divisor);
    var x = divisor.toNumber();
    var sign = Kotlin.Long.fromNumber(Math_0.sign(x));
    return new Fraction(sign.multiply(numerator).div(gcd), sign.multiply(divisor).div(gcd));
  };
  Fraction$Builder.prototype.gcd_0 = function (a, b) {
    var tmp$;
    if (equals(a, L0))
      tmp$ = abs(b);
    else if (equals(b, L0))
      tmp$ = abs(a);
    else if (equals(a, L1) || equals(b, L1))
      tmp$ = L1;
    else if (equals(a.modulo(L2), L0) && equals(b.modulo(L2), L0))
      tmp$ = L2.multiply(this.gcd_0(a.div(Kotlin.Long.fromInt(2)), b.div(Kotlin.Long.fromInt(2))));
    else if (equals(a.modulo(L2), L0))
      tmp$ = this.gcd_0(a.div(Kotlin.Long.fromInt(2)), b);
    else if (equals(b.modulo(L2), L0))
      tmp$ = this.gcd_0(a, b.div(Kotlin.Long.fromInt(2)));
    else {
      var x = abs(a);
      var y = abs(b);
      tmp$ = this.gcd_0(x.compareTo_11rb$(y) <= 0 ? x : y, abs(x.subtract(y)));
    }
    return tmp$;
  };
  Fraction$Builder.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Builder',
    interfaces: []
  };
  Fraction$Builder.prototype.component1 = function () {
    return this.numerator;
  };
  Fraction$Builder.prototype.component2 = function () {
    return this.divisor;
  };
  Fraction$Builder.prototype.copy_3pjtqy$ = function (numerator, divisor) {
    return new Fraction$Builder(numerator === void 0 ? this.numerator : numerator, divisor === void 0 ? this.divisor : divisor);
  };
  Fraction$Builder.prototype.toString = function () {
    return 'Builder(numerator=' + Kotlin.toString(this.numerator) + (', divisor=' + Kotlin.toString(this.divisor)) + ')';
  };
  Fraction$Builder.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.numerator) | 0;
    result = result * 31 + Kotlin.hashCode(this.divisor) | 0;
    return result;
  };
  Fraction$Builder.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.numerator, other.numerator) && Kotlin.equals(this.divisor, other.divisor)))));
  };
  Fraction.prototype.plus_qzel40$ = function (other) {
    var tmp$;
    return (new Fraction$Builder()).build_3pjtqy$(this.num.multiply((Kotlin.isType(tmp$ = other, Fraction) ? tmp$ : throwCCE()).div).add(this.div.multiply(other.num)), this.div.multiply(other.div));
  };
  Fraction.prototype.unaryMinus = function () {
    var tmp$;
    return Kotlin.isType(tmp$ = new Fraction(this.num.unaryMinus(), this.div), Invertible) ? tmp$ : throwCCE();
  };
  Fraction.prototype.minus_qzel40$ = function (other) {
    return this.plus_qzel40$(other.unaryMinus());
  };
  Fraction.prototype.times_qzel40$ = function (other) {
    var tmp$;
    return (new Fraction$Builder()).build_3pjtqy$(this.num.multiply((Kotlin.isType(tmp$ = other, Fraction) ? tmp$ : throwCCE()).num), this.div.multiply(other.div));
  };
  Fraction.prototype.invert = function () {
    return (new Fraction$Builder()).build_3pjtqy$(this.div, this.num);
  };
  Fraction.prototype.div_qzel40$ = function (other) {
    var tmp$;
    return this.times_qzel40$((Kotlin.isType(tmp$ = other, Fraction) ? tmp$ : throwCCE()).invert());
  };
  Fraction.prototype.toString = function () {
    return this.num.toString() + ' / ' + this.div.toString();
  };
  Fraction.prototype.equals = function (other) {
    var tmp$;
    if (Kotlin.isType(other, Fraction))
      tmp$ = equals(this.num.multiply(other.div), this.div.multiply(other.num));
    else if (typeof other === 'number')
      tmp$ = this.value === other;
    else
      tmp$ = false;
    return tmp$;
  };
  Fraction.prototype.compareTo_qzel40$ = function (other) {
    var tmp$;
    return Kotlin.compareTo(this.value, (Kotlin.isType(tmp$ = other, Fraction) ? tmp$ : throwCCE()).value);
  };
  Fraction.prototype.myVal_za3lpa$ = function (int) {
    var tmp$;
    return Kotlin.isType(tmp$ = new Fraction(Kotlin.Long.fromInt(int), L1), Invertible) ? tmp$ : throwCCE();
  };
  Fraction.prototype.toInvertible = function () {
    return this;
  };
  Fraction.prototype.toRootable = function () {
    var tmp$;
    return Kotlin.isType(tmp$ = new MyDouble(this.value), Rootable) ? tmp$ : throwCCE();
  };
  Fraction.prototype.times_za3lpa$ = function (other) {
    return (new Fraction$Builder()).build_3pjtqy$(this.num.multiply(Kotlin.Long.fromInt(other)), this.div);
  };
  Fraction.prototype.sqrt = function () {
    var x = this.value;
    var newValue = Math_0.sqrt(x);
    var x_0 = this.div.toNumber();
    var newDiv = roundToLong(Math_0.sqrt(x_0));
    var x_1 = newValue * newDiv.toNumber();
    var newNum = Kotlin.Long.fromNumber(Math_0.ceil(x_1));
    return new Fraction(newNum, newDiv, newValue);
  };
  Fraction.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Fraction',
    interfaces: [Invertible]
  };
  function Complex(real, image) {
    if (real === void 0)
      real = 0.0;
    if (image === void 0)
      image = 0.0;
    this.real = real;
    this.image = image;
    this.absD_r1wlqk$_0 = lazy(Complex$absD$lambda(this));
  }
  Object.defineProperty(Complex.prototype, 'absD', {
    configurable: true,
    get: function () {
      return this.absD_r1wlqk$_0.value;
    }
  });
  Complex.prototype.plus_qzel40$ = function (other) {
    var tmp$;
    return new Complex(this.real + (Kotlin.isType(tmp$ = other, Complex) ? tmp$ : throwCCE()).real, this.image + other.image);
  };
  Complex.prototype.unaryMinus = function () {
    return new Complex(-this.real, -this.image);
  };
  Complex.prototype.minus_qzel40$ = function (other) {
    return this.plus_qzel40$(other.unaryMinus());
  };
  Complex.prototype.times_14dthe$ = function (other) {
    return new Complex(this.real * other, this.image * other);
  };
  Complex.prototype.div_14dthe$ = function (scalar) {
    return this.times_14dthe$(1 / scalar);
  };
  Complex.prototype.times_qzel40$ = function (other) {
    var tmp$;
    return new Complex(this.real * (Kotlin.isType(tmp$ = other, Complex) ? tmp$ : throwCCE()).real - this.image * other.image, this.real * other.image + this.image * other.real);
  };
  Complex.prototype.conj = function () {
    return new Complex(this.real, -this.image);
  };
  Complex.prototype.invert = function () {
    return this.conj().div_14dthe$(this.times_qzel40$(this.conj()).absD);
  };
  Complex.prototype.div_qzel40$ = function (other) {
    var tmp$;
    return this.times_qzel40$((Kotlin.isType(tmp$ = other, Complex) ? tmp$ : throwCCE()).invert());
  };
  Complex.prototype.toString = function () {
    return this.real.toString() + ' + ' + this.image + ' i';
  };
  Complex.prototype.equals = function (other) {
    var tmp$;
    if (Kotlin.isType(other, Complex))
      tmp$ = (this.real === other.real && this.image === other.image);
    else if (typeof other === 'number')
      tmp$ = (this.real === other && this.image === 0.0);
    else
      tmp$ = false;
    return tmp$;
  };
  Complex.prototype.compareTo_qzel40$ = function (other) {
    var tmp$;
    return Kotlin.compareTo(this.absD, (Kotlin.isType(tmp$ = other, Complex) ? tmp$ : throwCCE()).absD);
  };
  Complex.prototype.abs = function () {
    var tmp$;
    var $receiver = this.times_qzel40$(this.conj()).real;
    return Kotlin.isType(tmp$ = new Complex(Math_0.pow($receiver, 0.5), 0.0), Algebraic) ? tmp$ : throwCCE();
  };
  Complex.prototype.absDouble = function () {
    var tmp$;
    var $receiver = this.times_qzel40$(this.conj()).real;
    return Kotlin.isType(tmp$ = new MyDouble(Math_0.pow($receiver, 0.5)), Rootable) ? tmp$ : throwCCE();
  };
  Complex.prototype.myVal_za3lpa$ = function (int) {
    return new Complex(int, 0.0);
  };
  Complex.prototype.toPolar = function () {
    var tmp$;
    if (this.image === 0.0 && this.real >= 0.0)
      tmp$ = 0.0;
    else if (this.image === 0.0)
      tmp$ = math.PI;
    else if (this.real === 0.0 && this.image > 0.0)
      tmp$ = math.PI / 2;
    else if (this.real === 0.0)
      tmp$ = -math.PI / 2;
    else if (this.real > 0.0) {
      var x = this.real / this.image;
      tmp$ = Math_0.atan(x);
    } else {
      var x_0 = this.real / this.image;
      tmp$ = Math_0.atan(x_0) + math.PI;
    }
    var theta = tmp$;
    return (new Polar$Builder(this.absD, theta)).build();
  };
  Complex.prototype.pow_qi8z6v$ = function (num) {
    var tmp$, tmp$_0, tmp$_1;
    return (Kotlin.isType(tmp$_1 = (Kotlin.isType(tmp$ = this.toPolar(), Polar) ? tmp$ : throwCCE()).pow_knsepa$(Kotlin.isType(tmp$_0 = num, Complex) ? tmp$_0 : throwCCE()), Polar) ? tmp$_1 : throwCCE()).toComplex();
  };
  Complex.prototype.toInvertible = function () {
    return this;
  };
  Complex.prototype.toRootable = function () {
    return this;
  };
  Complex.prototype.times_za3lpa$ = function (other) {
    return new Complex(this.real * other, this.image * other);
  };
  Complex.prototype.pow_s165k8$ = function (num) {
    var tmp$;
    return this.pow_qi8z6v$(new Complex((Kotlin.isType(tmp$ = num, Fraction) ? tmp$ : throwCCE()).value, 0.0));
  };
  Complex.prototype.toMyDouble = function () {
    return new MyDouble(this.absD);
  };
  Complex.prototype.getSign = function () {
    var tmp$;
    if (this.real === 0.0 && this.image === 0.0) {
      tmp$ = new Complex(1.0);
    } else {
      tmp$ = this.div_14dthe$(this.absD);
    }
    return tmp$;
  };
  function Complex$absD$lambda(this$Complex) {
    return function () {
      var tmp$;
      return (Kotlin.isType(tmp$ = this$Complex.absDouble(), MyDouble) ? tmp$ : throwCCE()).value;
    };
  }
  Complex.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Complex',
    interfaces: [Algebraic]
  };
  function Polar(r, theta) {
    this.r = r;
    this.theta = theta;
  }
  function Polar$Builder(r, theta) {
    this.r = r;
    this.theta = theta;
  }
  Polar$Builder.prototype.build = function () {
    if (this.r < 0.0) {
      this.r = -this.r;
      this.theta += math.PI;
    }this.theta %= math.PI * 2;
    if (this.theta > math.PI)
      this.theta -= math.PI * 2;
    if (this.theta <= math.PI)
      this.theta += math.PI * 2;
    return new Polar(this.r, this.theta);
  };
  Polar$Builder.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Builder',
    interfaces: []
  };
  Polar$Builder.prototype.component1 = function () {
    return this.r;
  };
  Polar$Builder.prototype.component2 = function () {
    return this.theta;
  };
  Polar$Builder.prototype.copy_lu1900$ = function (r, theta) {
    return new Polar$Builder(r === void 0 ? this.r : r, theta === void 0 ? this.theta : theta);
  };
  Polar$Builder.prototype.toString = function () {
    return 'Builder(r=' + Kotlin.toString(this.r) + (', theta=' + Kotlin.toString(this.theta)) + ')';
  };
  Polar$Builder.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.r) | 0;
    result = result * 31 + Kotlin.hashCode(this.theta) | 0;
    return result;
  };
  Polar$Builder.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.r, other.r) && Kotlin.equals(this.theta, other.theta)))));
  };
  Polar.prototype.plus_qzel40$ = function (other) {
    var tmp$, tmp$_0, tmp$_1;
    tmp$_0 = this.theta - (Kotlin.isType(tmp$ = other, Polar) ? tmp$ : throwCCE()).theta;
    if (tmp$_0 === 0.0)
      return new Polar(this.r + other.r, this.theta);
    else if (tmp$_0 === math.PI || tmp$_0 === -math.PI)
      return (new Polar$Builder(this.r - other.r, this.theta)).build();
    else
      return (Kotlin.isType(tmp$_1 = this.toComplex().plus_qzel40$(other.toComplex()), Complex) ? tmp$_1 : throwCCE()).toPolar();
  };
  Polar.prototype.unaryMinus = function () {
    return (new Polar$Builder(this.r, this.theta + math.PI)).build();
  };
  Polar.prototype.minus_qzel40$ = function (other) {
    return this.plus_qzel40$(other.unaryMinus());
  };
  Polar.prototype.times_qzel40$ = function (other) {
    var tmp$;
    return (new Polar$Builder(this.r * (Kotlin.isType(tmp$ = other, Polar) ? tmp$ : throwCCE()).r, this.theta + other.theta)).build();
  };
  Polar.prototype.div_qzel40$ = function (other) {
    var tmp$;
    return (new Polar$Builder(this.r / (Kotlin.isType(tmp$ = other, Polar) ? tmp$ : throwCCE()).r, this.theta - other.theta)).build();
  };
  Polar.prototype.compareTo_qzel40$ = function (other) {
    var tmp$;
    return Kotlin.compareTo(this.r, (Kotlin.isType(tmp$ = other, Polar) ? tmp$ : throwCCE()).r);
  };
  Polar.prototype.myVal_za3lpa$ = function (int) {
    return (new Polar$Builder(int, 0.0)).build();
  };
  Polar.prototype.pow_qi8z6v$ = function (num) {
    var tmp$, tmp$_0;
    return this.pow_knsepa$(Kotlin.isType(tmp$_0 = (Kotlin.isType(tmp$ = num, Polar) ? tmp$ : throwCCE()).toComplex(), Complex) ? tmp$_0 : throwCCE());
  };
  Polar.prototype.conj = function () {
    return (new Polar$Builder(this.r, math.PI - this.theta)).build();
  };
  Polar.prototype.pow_knsepa$ = function (num) {
    var x = this.r;
    var ln = Math_0.log(x);
    var exp = num.real * ln - num.image * this.theta;
    var newTheta = num.image * ln + num.real * this.theta;
    return (new Polar$Builder(Math_0.exp(exp), newTheta)).build();
  };
  Polar.prototype.toComplex = function () {
    var tmp$;
    var tmp$_0 = this.r;
    var x = this.theta;
    var tmp$_1 = tmp$_0 * Math_0.cos(x);
    var tmp$_2 = this.r;
    var x_0 = this.theta;
    return Kotlin.isType(tmp$ = new Complex(tmp$_1, tmp$_2 * Math_0.sin(x_0)), Algebraic) ? tmp$ : throwCCE();
  };
  Polar.prototype.toInvertible = function () {
    return this;
  };
  Polar.prototype.toRootable = function () {
    return this;
  };
  Polar.prototype.abs = function () {
    return new Polar(this.r, 0.0);
  };
  Polar.prototype.absDouble = function () {
    var tmp$;
    return Kotlin.isType(tmp$ = new MyDouble(this.r), Rootable) ? tmp$ : throwCCE();
  };
  Polar.prototype.times_za3lpa$ = function (other) {
    return (new Polar$Builder(this.r * other, this.theta)).build();
  };
  Polar.prototype.times_14dthe$ = function (other) {
    return (new Polar$Builder(this.r * other, this.theta)).build();
  };
  Polar.prototype.toMyDouble = function () {
    var tmp$;
    return Kotlin.isType(tmp$ = new MyDouble(this.r), Rootable) ? tmp$ : throwCCE();
  };
  Polar.prototype.pow_s165k8$ = function (num) {
    var tmp$;
    var power = (Kotlin.isType(tmp$ = num, Fraction) ? tmp$ : throwCCE()).value;
    var $receiver = this.r;
    return (new Polar$Builder(Math_0.pow($receiver, power), this.theta * power)).build();
  };
  Polar.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Polar',
    interfaces: [Algebraic]
  };
  function Matrix(width, height, zero, one, values) {
    this.width = width;
    this.height = height;
    this.zero = zero;
    this.one = one;
    this.values_0 = values;
    this.det_qvrn9m$_0 = lazy(Matrix$det$lambda(this));
  }
  function Matrix$Builder(width, height) {
    if (width === void 0)
      width = 0;
    if (height === void 0)
      height = 0;
    this.width = width;
    this.height = height;
  }
  Matrix$Builder.prototype.parameters_vux9f0$ = function (width, height) {
    this.width = width;
    this.height = height;
  };
  Matrix$Builder.prototype.rows_pxhtut$ = function (vectors) {
    var tmp$;
    var destination = ArrayList_init_0();
    var tmp$_0;
    tmp$_0 = vectors.iterator();
    while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      if (element.size !== 0)
        destination.add_11rb$(element);
    }
    var newVectors = destination;
    var zero = newVectors.get_za3lpa$(0).get_za3lpa$(0).myVal_za3lpa$(0);
    var one = zero.myVal_za3lpa$(1);
    var destination_0 = ArrayList_init(collectionSizeOrDefault(newVectors, 10));
    var tmp$_1;
    tmp$_1 = newVectors.iterator();
    while (tmp$_1.hasNext()) {
      var item = tmp$_1.next();
      destination_0.add_11rb$(item.size);
    }
    var maxByOrNull$result;
    maxByOrNull$break: do {
      var iterator = destination_0.iterator();
      if (!iterator.hasNext()) {
        maxByOrNull$result = null;
        break maxByOrNull$break;
      }var maxElem = iterator.next();
      if (!iterator.hasNext()) {
        maxByOrNull$result = maxElem;
        break maxByOrNull$break;
      }var maxValue = maxElem;
      do {
        var e = iterator.next();
        var v = e;
        if (Kotlin.compareTo(maxValue, v) < 0) {
          maxElem = e;
          maxValue = v;
        }}
       while (iterator.hasNext());
      maxByOrNull$result = maxElem;
    }
     while (false);
    var width = (tmp$ = maxByOrNull$result) != null ? tmp$ : 0;
    var height = newVectors.size;
    var list = ArrayList_init(height);
    for (var index = 0; index < height; index++) {
      var tmp$_2 = list.add_11rb$;
      var list_0 = ArrayList_init(width);
      for (var index_0 = 0; index_0 < width; index_0++) {
        var tmp$_3;
        list_0.add_11rb$((tmp$_3 = newVectors.get_za3lpa$(index).getOrNull_za3lpa$(index_0)) != null ? tmp$_3 : zero);
      }
      tmp$_2.call(list, list_0);
    }
    var values = list;
    return new Matrix(width, height, zero, one, values);
  };
  Matrix$Builder.prototype.columns_pxhtut$ = function (vectors) {
    var tmp$;
    var destination = ArrayList_init_0();
    var tmp$_0;
    tmp$_0 = vectors.iterator();
    while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      if (element.size !== 0)
        destination.add_11rb$(element);
    }
    var newVectors = destination;
    var zero = newVectors.get_za3lpa$(0).get_za3lpa$(0).myVal_za3lpa$(0);
    var one = zero.myVal_za3lpa$(1);
    var width = newVectors.size;
    var destination_0 = ArrayList_init(collectionSizeOrDefault(newVectors, 10));
    var tmp$_1;
    tmp$_1 = newVectors.iterator();
    while (tmp$_1.hasNext()) {
      var item = tmp$_1.next();
      destination_0.add_11rb$(item.size);
    }
    var maxByOrNull$result;
    maxByOrNull$break: do {
      var iterator = destination_0.iterator();
      if (!iterator.hasNext()) {
        maxByOrNull$result = null;
        break maxByOrNull$break;
      }var maxElem = iterator.next();
      if (!iterator.hasNext()) {
        maxByOrNull$result = maxElem;
        break maxByOrNull$break;
      }var maxValue = maxElem;
      do {
        var e = iterator.next();
        var v = e;
        if (Kotlin.compareTo(maxValue, v) < 0) {
          maxElem = e;
          maxValue = v;
        }}
       while (iterator.hasNext());
      maxByOrNull$result = maxElem;
    }
     while (false);
    var height = (tmp$ = maxByOrNull$result) != null ? tmp$ : 0;
    var list = ArrayList_init(height);
    for (var index = 0; index < height; index++) {
      var tmp$_2 = list.add_11rb$;
      var list_0 = ArrayList_init(width);
      for (var index_0 = 0; index_0 < width; index_0++) {
        var tmp$_3;
        list_0.add_11rb$((tmp$_3 = newVectors.get_za3lpa$(index_0).getOrNull_za3lpa$(index)) != null ? tmp$_3 : zero);
      }
      tmp$_2.call(list, list_0);
    }
    var values = list;
    return new Matrix(width, height, zero, one, values);
  };
  Matrix$Builder.prototype.build_juu1im$ = function (data) {
    var zero = data.get_za3lpa$(0).myVal_za3lpa$(0);
    var one = zero.myVal_za3lpa$(1);
    var size = this.height;
    var list = ArrayList_init(size);
    for (var index = 0; index < size; index++) {
      var tmp$ = list.add_11rb$;
      var size_0 = this.width;
      var list_0 = ArrayList_init(size_0);
      for (var index_0 = 0; index_0 < size_0; index_0++) {
        list_0.add_11rb$(data.get_za3lpa$((Kotlin.imul(index, this.width) + index_0 | 0) % data.size));
      }
      tmp$.call(list, list_0);
    }
    var values = list;
    return new Matrix(this.width, this.height, zero, one, values);
  };
  Matrix$Builder.prototype.build_cf8x2h$ = function (width, height, zero, one, values) {
    return new Matrix(width, height, zero, one, values);
  };
  Matrix$Builder.prototype.identity_yhz85k$ = function (seed, width, height) {
    if (height === void 0)
      height = width;
    var one = seed.myVal_za3lpa$(1);
    var zero = seed.myVal_za3lpa$(0);
    var list = ArrayList_init(height);
    for (var index = 0; index < height; index++) {
      var tmp$ = list.add_11rb$;
      var list_0 = ArrayList_init(width);
      for (var index_0 = 0; index_0 < width; index_0++) {
        list_0.add_11rb$(index_0 === index ? one : zero);
      }
      tmp$.call(list, list_0);
    }
    var values = list;
    return new Matrix(width, height, zero, one, values);
  };
  Matrix$Builder.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Builder',
    interfaces: []
  };
  Matrix$Builder.prototype.component1 = function () {
    return this.width;
  };
  Matrix$Builder.prototype.component2 = function () {
    return this.height;
  };
  Matrix$Builder.prototype.copy_vux9f0$ = function (width, height) {
    return new Matrix$Builder(width === void 0 ? this.width : width, height === void 0 ? this.height : height);
  };
  Matrix$Builder.prototype.toString = function () {
    return 'Builder(width=' + Kotlin.toString(this.width) + (', height=' + Kotlin.toString(this.height)) + ')';
  };
  Matrix$Builder.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.width) | 0;
    result = result * 31 + Kotlin.hashCode(this.height) | 0;
    return result;
  };
  Matrix$Builder.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.width, other.width) && Kotlin.equals(this.height, other.height)))));
  };
  Object.defineProperty(Matrix.prototype, 'det', {
    configurable: true,
    get: function () {
      return this.det_qvrn9m$_0.value;
    }
  });
  Matrix.prototype.getRow_za3lpa$ = function (j) {
    return (new Vector$Builder(this.values_0.get_za3lpa$(j))).build();
  };
  Matrix.prototype.getRowOrNull_za3lpa$ = function (j) {
    var tmp$;
    tmp$ = this.height;
    if (0 <= j && j < tmp$) {
      return this.getRow_za3lpa$(j);
    }return null;
  };
  Matrix.prototype.getCol_za3lpa$ = function (i) {
    var size = this.height;
    var list = ArrayList_init(size);
    for (var index = 0; index < size; index++) {
      list.add_11rb$(this.values_0.get_za3lpa$(index).get_za3lpa$(i));
    }
    var list_0 = list;
    return (new Vector$Builder(list_0)).build();
  };
  Matrix.prototype.getColOrNull_za3lpa$ = function (i) {
    var tmp$;
    tmp$ = this.width;
    if (0 <= i && i < tmp$) {
      return this.getCol_za3lpa$(i);
    }return null;
  };
  Matrix.prototype.getIndexed_vux9f0$ = function (i, j) {
    return this.values_0.get_za3lpa$(j).get_za3lpa$(i);
  };
  Matrix.prototype.plus_u1spcz$ = function (other) {
    if (this.width !== other.width || this.height !== other.height) {
      return null;
    }var size = this.height;
    var list = ArrayList_init(size);
    for (var index = 0; index < size; index++) {
      var tmp$ = list.add_11rb$;
      var size_0 = this.width;
      var list_0 = ArrayList_init(size_0);
      for (var index_0 = 0; index_0 < size_0; index_0++) {
        list_0.add_11rb$(this.getIndexed_vux9f0$(index_0, index).plus_qzel40$(other.getIndexed_vux9f0$(index_0, index)));
      }
      tmp$.call(list, list_0);
    }
    var newData = list;
    return new Matrix(this.width, this.height, this.zero, this.one, newData);
  };
  Matrix.prototype.times_u1spcz$ = function (other) {
    if (this.width !== other.height) {
      return null;
    }var size = this.height;
    var list = ArrayList_init(size);
    for (var index = 0; index < size; index++) {
      var tmp$ = list.add_11rb$;
      var size_0 = other.width;
      var list_0 = ArrayList_init(size_0);
      for (var index_0 = 0; index_0 < size_0; index_0++) {
        list_0.add_11rb$(ensureNotNull(this.getRow_za3lpa$(index).times_k9oufv$(other.getCol_za3lpa$(index_0))));
      }
      tmp$.call(list, list_0);
    }
    var newData = list;
    return new Matrix(other.width, this.height, this.zero, this.one, newData);
  };
  Matrix.prototype.times_k9oufv$ = function (vector) {
    if (this.width === vector.size) {
      var size = this.height;
      var list = ArrayList_init(size);
      for (var index = 0; index < size; index++) {
        list.add_11rb$(ensureNotNull(this.getRow_za3lpa$(index).times_k9oufv$(vector)));
      }
      var list_0 = list;
      return (new Vector$Builder(list_0)).build();
    }return null;
  };
  Matrix.prototype.times_6gsczt$ = function (other) {
    var size = this.height;
    var list = ArrayList_init(size);
    for (var index = 0; index < size; index++) {
      var tmp$ = list.add_11rb$;
      var size_0 = this.width;
      var list_0 = ArrayList_init(size_0);
      for (var index_0 = 0; index_0 < size_0; index_0++) {
        list_0.add_11rb$(other.times_qzel40$(this.values_0.get_za3lpa$(index).get_za3lpa$(index_0)));
      }
      tmp$.call(list, list_0);
    }
    var newData = list;
    return new Matrix(this.width, this.height, this.zero, this.one, newData);
  };
  Matrix.prototype.conjugate = function () {
    var size = this.height;
    var list = ArrayList_init(size);
    for (var index = 0; index < size; index++) {
      var tmp$ = list.add_11rb$;
      var size_0 = this.width;
      var list_0 = ArrayList_init(size_0);
      for (var index_0 = 0; index_0 < size_0; index_0++) {
        var tmp$_0, tmp$_1;
        list_0.add_11rb$(Kotlin.isType(tmp$_1 = (Kotlin.isType(tmp$_0 = this.getIndexed_vux9f0$(index_0, index), Invertible) ? tmp$_0 : throwCCE()).conj(), MyNumber) ? tmp$_1 : throwCCE());
      }
      tmp$.call(list, list_0);
    }
    var newValues = list;
    return (new Matrix$Builder()).build_cf8x2h$(this.width, this.height, this.zero, this.one, newValues);
  };
  Matrix.prototype.transpose = function () {
    var size = this.width;
    var list = ArrayList_init(size);
    for (var index = 0; index < size; index++) {
      var tmp$ = list.add_11rb$;
      var size_0 = this.height;
      var list_0 = ArrayList_init(size_0);
      for (var index_0 = 0; index_0 < size_0; index_0++) {
        list_0.add_11rb$(this.values_0.get_za3lpa$(index_0).get_za3lpa$(index));
      }
      tmp$.call(list, list_0);
    }
    var newData = list;
    return new Matrix(this.height, this.width, this.zero, this.one, newData);
  };
  Matrix.prototype.getMinor_vux9f0$ = function (i, j) {
    var tmp$, tmp$_0, tmp$_1;
    tmp$ = this.width;
    if (0 <= i && i < tmp$) {
      tmp$_0 = this.height;
      tmp$_1 = (0 <= j && j < tmp$_0);
    } else
      tmp$_1 = false;
    if (tmp$_1) {
      var size = this.height - 1 | 0;
      var list = ArrayList_init(size);
      for (var index = 0; index < size; index++) {
        var tmp$_2 = list.add_11rb$;
        var size_0 = this.width - 1 | 0;
        var list_0 = ArrayList_init(size_0);
        for (var index_0 = 0; index_0 < size_0; index_0++) {
          var tmp$_3 = list_0.add_11rb$;
          var init$result;
          if (index_0 < i && index < j) {
            init$result = this.values_0.get_za3lpa$(index).get_za3lpa$(index_0);
          } else if (index_0 < i) {
            init$result = this.values_0.get_za3lpa$(index + 1 | 0).get_za3lpa$(index_0);
          } else if (index < j) {
            init$result = this.values_0.get_za3lpa$(index).get_za3lpa$(index_0 + 1 | 0);
          } else {
            init$result = this.values_0.get_za3lpa$(index + 1 | 0).get_za3lpa$(index_0 + 1 | 0);
          }
          tmp$_3.call(list_0, init$result);
        }
        tmp$_2.call(list, list_0);
      }
      var newData = list;
      return new Matrix(this.width - 1 | 0, this.height - 1 | 0, this.zero, this.one, newData);
    }return null;
  };
  Matrix.prototype.determinant = function () {
    var tmp$;
    if (this.width !== this.height)
      return null;
    if (this.width === 1)
      return this.values_0.get_za3lpa$(0).get_za3lpa$(0);
    if (this.width === 2)
      return this.values_0.get_za3lpa$(0).get_za3lpa$(0).times_qzel40$(this.values_0.get_za3lpa$(1).get_za3lpa$(1)).minus_qzel40$(this.values_0.get_za3lpa$(0).get_za3lpa$(1).times_qzel40$(this.values_0.get_za3lpa$(1).get_za3lpa$(0)));
    var ans = this.values_0.get_za3lpa$(0).get_za3lpa$(0).myVal_za3lpa$(0);
    tmp$ = this.width;
    for (var i = 0; i < tmp$; i++) {
      ans = ans.plus_qzel40$(this.values_0.get_za3lpa$(0).get_za3lpa$(i).times_qzel40$(ensureNotNull(this.coFactor_vux9f0$(i, 0))));
    }
    return ans;
  };
  Matrix.prototype.coFactor_vux9f0$ = function (i, j) {
    var tmp$, tmp$_0, tmp$_1;
    var positive = (i + j | 0) % 2 === 0;
    return positive ? (tmp$ = this.getMinor_vux9f0$(i, j)) != null ? tmp$.determinant() : null : (tmp$_1 = (tmp$_0 = this.getMinor_vux9f0$(i, j)) != null ? tmp$_0.determinant() : null) != null ? tmp$_1.unaryMinus() : null;
  };
  Matrix.prototype.coFactorMatrix = function () {
    if (this.width !== this.height)
      return null;
    var size = this.height;
    var list = ArrayList_init(size);
    for (var index = 0; index < size; index++) {
      var tmp$ = list.add_11rb$;
      var size_0 = this.width;
      var list_0 = ArrayList_init(size_0);
      for (var index_0 = 0; index_0 < size_0; index_0++) {
        var tmp$_0;
        list_0.add_11rb$(Kotlin.isType(tmp$_0 = ensureNotNull(this.coFactor_vux9f0$(index_0, index)), MyNumber) ? tmp$_0 : throwCCE());
      }
      tmp$.call(list, list_0);
    }
    var newValues = list;
    return (new Matrix$Builder()).build_cf8x2h$(this.width, this.height, this.zero, this.one, newValues);
  };
  Matrix.prototype.toString = function () {
    var tmp$, tmp$_0;
    var string = '';
    tmp$ = this.height;
    for (var j = 0; j < tmp$; j++) {
      string += ((tmp$_0 = this.getRowOrNull_za3lpa$(j)) != null ? tmp$_0.toString() : null) + '\n';
    }
    return string;
  };
  Matrix.prototype.unaryMinus = function () {
    var size = this.height;
    var list = ArrayList_init(size);
    for (var index = 0; index < size; index++) {
      var tmp$ = list.add_11rb$;
      var size_0 = this.width;
      var list_0 = ArrayList_init(size_0);
      for (var index_0 = 0; index_0 < size_0; index_0++) {
        list_0.add_11rb$(this.values_0.get_za3lpa$(index).get_za3lpa$(index_0).unaryMinus());
      }
      tmp$.call(list, list_0);
    }
    var newValues = list;
    return new Matrix(this.width, this.height, this.zero, this.one, newValues);
  };
  Matrix.prototype.minus_u1spcz$ = function (other) {
    return this.plus_u1spcz$(other.unaryMinus());
  };
  Matrix.prototype.normF = function () {
    var tmp$;
    var sum = this.zero;
    tmp$ = this.width;
    for (var i = 0; i < tmp$; i++) {
      sum = sum.plus_qzel40$(this.getCol_za3lpa$(i).absSqr());
    }
    return sum.sqrt();
  };
  Matrix.prototype.norm1 = function () {
    var tmp$;
    var ans = this.zero;
    tmp$ = this.width;
    for (var i = 0; i < tmp$; i++) {
      ans = ans.max_qzel40$(this.getCol_za3lpa$(i).norm1());
    }
    return ans;
  };
  Matrix.prototype.norm2 = function () {
    throw new NotImplementedError_init();
  };
  Matrix.prototype.normInf = function () {
    var tmp$;
    var ans = this.zero;
    tmp$ = this.height;
    for (var j = 0; j < tmp$; j++) {
      ans = ans.max_qzel40$(this.getRow_za3lpa$(j).norm1());
    }
    return ans;
  };
  Matrix.prototype.getHh_vux9f0$ = function (col, index) {
    if (index === void 0)
      index = col;
    var tmp$;
    var invertible = Kotlin.isType(this.one, Invertible);
    var x = this.getCol_za3lpa$(col).subVector_vux9f0$(index);
    var x0 = x.get_za3lpa$(0);
    var sign = x0.getSign();
    var mag = x.norm2();
    var v0 = x0.plus_qzel40$(sign.times_qzel40$(mag));
    if (invertible) {
      var size = x.size;
      var list = ArrayList_init(size);
      for (var index_0 = 0; index_0 < size; index_0++) {
        var tmp$_0 = list.add_11rb$;
        var init$result;
        if (index_0 === 0) {
          init$result = this.one;
        } else {
          init$result = x.get_za3lpa$(index_0).div_qzel40$(v0);
        }
        tmp$_0.call(list, init$result);
      }
      tmp$ = list;
    } else {
      var size_0 = x.size;
      var list_0 = ArrayList_init(size_0);
      for (var index_1 = 0; index_1 < size_0; index_1++) {
        var tmp$_1 = list_0.add_11rb$;
        var init$result_0;
        if (index_1 === 0) {
          init$result_0 = v0;
        } else {
          init$result_0 = x.get_za3lpa$(index_1);
        }
        tmp$_1.call(list_0, init$result_0);
      }
      tmp$ = list_0;
    }
    var list_1 = tmp$;
    return new Pair(new Vector(list_1), sign.times_qzel40$(mag));
  };
  function Matrix$det$lambda(this$Matrix) {
    return function () {
      return this$Matrix.determinant();
    };
  }
  Matrix.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Matrix',
    interfaces: []
  };
  function inverse($receiver) {
    var tmp$;
    var mat = $receiver.coFactorMatrix();
    if (mat == null || equals($receiver.det, $receiver.zero) || $receiver.det == null)
      return null;
    return div(mat.transpose(), Kotlin.isType(tmp$ = $receiver.det, Invertible) ? tmp$ : throwCCE());
  }
  function div($receiver, scalar) {
    return $receiver.times_6gsczt$(scalar.invert());
  }
  function factorQR($receiver) {
    var tmp$, tmp$_0;
    var seed = $receiver.one;
    var matR = {v: $receiver};
    var matQ = {v: (new Matrix$Builder()).identity_yhz85k$(seed, $receiver.height)};
    var hhVectors = LinkedHashMap_init();
    tmp$ = matR.v.width;
    for (var index = 0; index < tmp$; index++) {
      if (index === (matR.v.height - 1 | 0))
        break;
      var houseHolder = matR.v.getHh_vux9f0$(index);
      var herm = houseHolder.first.conjugate();
      var scaleFactor = herm.absSqr().div_qzel40$(seed.myVal_za3lpa$(2));
      plus(hhVectors, to(houseHolder.first, to(herm, scaleFactor)));
      var size = herm.size;
      var list = ArrayList_init(size);
      for (var index_0 = 0; index_0 < size; index_0++) {
        list.add_11rb$(ensureNotNull(herm.times_k9oufv$(matR.v.getCol_za3lpa$(index + index_0 | 0).subVector_vux9f0$(index))).div_qzel40$(scaleFactor));
      }
      var row = new Vector(list);
      var size_0 = matR.v.height;
      var list_0 = ArrayList_init(size_0);
      for (var index_1 = 0; index_1 < size_0; index_1++) {
        var tmp$_1 = list_0.add_11rb$;
        var size_1 = matR.v.width;
        var list_1 = ArrayList_init(size_1);
        for (var index_2 = 0; index_2 < size_1; index_2++) {
          var tmp$_2 = list_1.add_11rb$;
          var init$result;
          if (index_2 < index || index_1 < index) {
            init$result = matR.v.getIndexed_vux9f0$(index_2, index_1);
          } else if (index_1 === index && index_2 === index) {
            init$result = matR.v.getIndexed_vux9f0$(index_2, index_1).minus_qzel40$(houseHolder.second);
          } else if (index_1 === index) {
            init$result = $receiver.zero;
          } else if (index_2 === index) {
            init$result = matR.v.getIndexed_vux9f0$(index_2, index_1).minus_qzel40$(row.get_za3lpa$(index_1 - index | 0));
          } else {
            init$result = matR.v.getIndexed_vux9f0$(index_2, index_1).minus_qzel40$(houseHolder.first.get_za3lpa$(index_2 - index | 0).times_qzel40$(row.get_za3lpa$(index_1 - index | 0)));
          }
          tmp$_2.call(list_1, init$result);
        }
        tmp$_1.call(list_0, new Vector(list_1));
      }
      var newValues = list_0;
      matR.v = (new Matrix$Builder()).rows_pxhtut$(newValues);
    }
    var vectors = reversed(hhVectors.keys);
    tmp$_0 = vectors.iterator();
    while (tmp$_0.hasNext()) {
      var vector = tmp$_0.next();
      var index_3 = matQ.v.width - vector.size | 0;
      var tmp$_3 = ensureNotNull(hhVectors.get_11rb$(vector));
      var herm_0 = tmp$_3.component1()
      , scaleFactor_0 = tmp$_3.component2();
      var size_2 = vector.size;
      var list_2 = ArrayList_init(size_2);
      for (var index_4 = 0; index_4 < size_2; index_4++) {
        list_2.add_11rb$(ensureNotNull(herm_0.times_k9oufv$(matQ.v.getCol_za3lpa$(index_4))).div_qzel40$(scaleFactor_0));
      }
      var row_0 = new Vector(list_2);
      var size_3 = matQ.v.height;
      var list_3 = ArrayList_init(size_3);
      for (var index_5 = 0; index_5 < size_3; index_5++) {
        var tmp$_4 = list_3.add_11rb$;
        var size_4 = matQ.v.width;
        var list_4 = ArrayList_init(size_4);
        for (var index_6 = 0; index_6 < size_4; index_6++) {
          var tmp$_5 = list_4.add_11rb$;
          var init$result_0;
          if (index_6 < index_3 || index_5 < index_3) {
            init$result_0 = matQ.v.getIndexed_vux9f0$(index_6, index_5);
          } else if (index_5 === index_3 && index_6 === index_3) {
            init$result_0 = $receiver.one.minus_qzel40$($receiver.one.div_qzel40$(scaleFactor_0));
          } else if (index_5 === index_3) {
            init$result_0 = vector.get_za3lpa$(index_6 - index_3 | 0).unaryMinus().div_qzel40$(scaleFactor_0);
          } else if (index_6 === index_3) {
            init$result_0 = row_0.get_za3lpa$(index_5 - index_3 | 0).unaryMinus();
          } else {
            init$result_0 = matQ.v.getIndexed_vux9f0$(index_6, index_5).minus_qzel40$(vector.get_za3lpa$(index_6 - index_3 | 0).times_qzel40$(row_0.get_za3lpa$(index_5 - index_3 | 0)));
          }
          tmp$_5.call(list_4, init$result_0);
        }
        tmp$_4.call(list_3, new Vector(list_4));
      }
      var newValues_0 = list_3;
      matQ.v = (new Matrix$Builder()).rows_pxhtut$(newValues_0);
    }
    return to(matQ.v, matR.v);
  }
  function Vector(values) {
    this.values_0 = values;
    this.size = this.values_0.size;
  }
  function Vector$Builder(values) {
    this.values = values;
  }
  Vector$Builder.prototype.build = function () {
    return new Vector(this.values);
  };
  Vector$Builder.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Builder',
    interfaces: []
  };
  Vector$Builder.prototype.component1 = function () {
    return this.values;
  };
  Vector$Builder.prototype.copy_4n2jl2$ = function (values) {
    return new Vector$Builder(values === void 0 ? this.values : values);
  };
  Vector$Builder.prototype.toString = function () {
    return 'Builder(values=' + Kotlin.toString(this.values) + ')';
  };
  Vector$Builder.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.values) | 0;
    return result;
  };
  Vector$Builder.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.values, other.values))));
  };
  Vector.prototype.getOrNull_za3lpa$ = function (i) {
    if (get_indices(this.values_0).contains_mef7kx$(i))
      return this.values_0.get_za3lpa$(i);
    return null;
  };
  Vector.prototype.get_za3lpa$ = function (i) {
    return this.values_0.get_za3lpa$(i);
  };
  Vector.prototype.plus_k9oufv$ = function (other) {
    if (this.size === other.size) {
      var size = this.size;
      var list = ArrayList_init(size);
      for (var index = 0; index < size; index++) {
        list.add_11rb$(this.values_0.get_za3lpa$(index).plus_qzel40$(other.get_za3lpa$(index)));
      }
      var list_0 = list;
      return new Vector(list_0);
    }return null;
  };
  Vector.prototype.times_k9oufv$ = function (other) {
    if (this.size === other.size) {
      var size = this.size;
      var list = ArrayList_init(size);
      for (var index = 0; index < size; index++) {
        list.add_11rb$(this.values_0.get_za3lpa$(index).times_qzel40$(other.get_za3lpa$(index)));
      }
      var list_0 = list;
      var tmp$;
      var accumulator = list_0.get_za3lpa$(0).myVal_za3lpa$(0);
      tmp$ = list_0.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        accumulator = accumulator.plus_qzel40$(element);
      }
      return accumulator;
    }return null;
  };
  Vector.prototype.unaryMinus = function () {
    var size = this.size;
    var list = ArrayList_init(size);
    for (var index = 0; index < size; index++) {
      list.add_11rb$(this.values_0.get_za3lpa$(index).unaryMinus());
    }
    var list_0 = list;
    return new Vector(list_0);
  };
  Vector.prototype.minus_k9oufv$ = function (other) {
    return this.plus_k9oufv$(other.unaryMinus());
  };
  Vector.prototype.times_u0k8nk$ = function (scalar) {
    var size = this.size;
    var list = ArrayList_init(size);
    for (var index = 0; index < size; index++) {
      list.add_11rb$(scalar.times_qzel40$(this.values_0.get_za3lpa$(index)));
    }
    var list_0 = list;
    return new Vector(list_0);
  };
  Vector.prototype.times_u1spcz$ = function (matrix) {
    if (this.size === matrix.height) {
      var size = matrix.width;
      var list = ArrayList_init(size);
      for (var index = 0; index < size; index++) {
        list.add_11rb$(ensureNotNull(this.times_k9oufv$(matrix.getCol_za3lpa$(index))));
      }
      var list_0 = list;
      return new Vector(list_0);
    }return null;
  };
  Vector.prototype.xMult_k9oufv$ = function (other) {
    var zero = this.get_za3lpa$(0).myVal_za3lpa$(0);
    var one = zero.myVal_za3lpa$(1);
    var size = this.size;
    var list = ArrayList_init(size);
    for (var index = 0; index < size; index++) {
      var tmp$ = list.add_11rb$;
      var size_0 = other.size;
      var list_0 = ArrayList_init(size_0);
      for (var index_0 = 0; index_0 < size_0; index_0++) {
        var tmp$_0;
        list_0.add_11rb$(Kotlin.isType(tmp$_0 = other.get_za3lpa$(index_0).times_qzel40$(this.get_za3lpa$(index)), MyNumber) ? tmp$_0 : throwCCE());
      }
      tmp$.call(list, list_0);
    }
    var values = list;
    return (new Matrix$Builder()).build_cf8x2h$(other.size, this.size, zero, one, values);
  };
  Vector.prototype.subVector_vux9f0$ = function (start, end) {
    if (end === void 0)
      end = this.size - 1 | 0;
    var list = this.values_0.subList_vux9f0$(start, end);
    return new Vector(list);
  };
  Vector.prototype.toMatrix_6taknv$ = function (vertical) {
    if (vertical === void 0)
      vertical = true;
    if (vertical)
      return (new Matrix$Builder()).columns_pxhtut$(listOf(this));
    return (new Matrix$Builder()).rows_pxhtut$(listOf(this));
  };
  Vector.prototype.isZeros = function () {
    var tmp$;
    var zero = this.get_za3lpa$(0).myVal_za3lpa$(0);
    tmp$ = this.size;
    for (var i = 0; i < tmp$; i++) {
      if (!equals(this.get_za3lpa$(i), zero))
        return false;
    }
    return true;
  };
  Vector.prototype.conjugate = function () {
    if (!Kotlin.isType(this.values_0.get_za3lpa$(0), Complex))
      return this;
    var $receiver = this.values_0;
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(item.conj());
    }
    var list = destination;
    return new Vector(list);
  };
  Vector.prototype.absSqr = function () {
    var $receiver = this.values_0;
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(item.absSq());
    }
    var iterator = destination.iterator();
    if (!iterator.hasNext())
      throw UnsupportedOperationException_init("Empty collection can't be reduced.");
    var accumulator = iterator.next();
    while (iterator.hasNext()) {
      accumulator = accumulator.plus_qzel40$(iterator.next());
    }
    return accumulator;
  };
  Vector.prototype.norm1 = function () {
    var $receiver = this.values_0;
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(item.abs());
    }
    var iterator = destination.iterator();
    if (!iterator.hasNext())
      throw UnsupportedOperationException_init("Empty collection can't be reduced.");
    var accumulator = iterator.next();
    while (iterator.hasNext()) {
      accumulator = accumulator.plus_qzel40$(iterator.next());
    }
    return accumulator;
  };
  Vector.prototype.normInf = function () {
    var $receiver = this.values_0;
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(item.abs());
    }
    var iterator = destination.iterator();
    if (!iterator.hasNext())
      throw UnsupportedOperationException_init("Empty collection can't be reduced.");
    var accumulator = iterator.next();
    while (iterator.hasNext()) {
      accumulator = accumulator.max_qzel40$(iterator.next());
    }
    return accumulator;
  };
  Vector.prototype.norm2 = function () {
    return this.absSqr().sqrt();
  };
  Vector.prototype.norm2Double = function () {
    return this.absSqr().absDouble().pow_s165k8$(Fraction$Companion_getInstance().HALF);
  };
  Vector.prototype.toHhReflector = function () {
    var scalar = this.absSqr().div_qzel40$(this.values_0.get_za3lpa$(0).myVal_za3lpa$(2));
    var one = scalar.myVal_za3lpa$(1);
    var invertible = Kotlin.isType(scalar, Invertible);
    var size = this.size;
    var list = ArrayList_init(size);
    for (var index = 0; index < size; index++) {
      var tmp$ = list.add_11rb$;
      var size_0 = this.size;
      var list_0 = ArrayList_init(size_0);
      for (var index_0 = 0; index_0 < size_0; index_0++) {
        var tmp$_0 = list_0.add_11rb$;
        var init$result;
        if (invertible && index_0 === index) {
          init$result = one.minus_qzel40$(this.values_0.get_za3lpa$(index).times_qzel40$(this.values_0.get_za3lpa$(index_0).conj()).div_qzel40$(scalar));
        } else if (invertible) {
          init$result = this.values_0.get_za3lpa$(index).unaryMinus().times_qzel40$(this.values_0.get_za3lpa$(index_0).conj()).div_qzel40$(scalar);
        } else if (index_0 === index) {
          init$result = scalar.minus_qzel40$(this.values_0.get_za3lpa$(index).times_qzel40$(this.values_0.get_za3lpa$(index_0).conj()));
        } else {
          init$result = this.values_0.get_za3lpa$(index).unaryMinus().times_qzel40$(this.values_0.get_za3lpa$(index_0).conj());
        }
        tmp$_0.call(list_0, init$result);
      }
      tmp$.call(list, new Vector(list_0));
    }
    var vectors = list;
    return (new Matrix$Builder()).rows_pxhtut$(vectors);
  };
  Vector.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Vector',
    interfaces: []
  };
  var package$mathPlus = _.mathPlus || (_.mathPlus = {});
  var package$commonMain = package$mathPlus.commonMain || (package$mathPlus.commonMain = {});
  package$commonMain.MyNumber = MyNumber;
  package$commonMain.Invertible = Invertible;
  package$commonMain.Rootable = Rootable;
  package$commonMain.Algebraic = Algebraic;
  package$commonMain.MyInt = MyInt;
  package$commonMain.MyLong = MyLong;
  package$commonMain.MyDouble = MyDouble;
  Object.defineProperty(Fraction, 'Companion', {
    get: Fraction$Companion_getInstance
  });
  Fraction.Builder = Fraction$Builder;
  package$commonMain.Fraction = Fraction;
  package$commonMain.Complex = Complex;
  Polar.Builder = Polar$Builder;
  package$commonMain.Polar = Polar;
  Matrix.Builder = Matrix$Builder;
  package$commonMain.Matrix = Matrix;
  package$commonMain.inverse_izmllg$ = inverse;
  package$commonMain.div_u7iv96$ = div;
  package$commonMain.factorQR_roz620$ = factorQR;
  Vector.Builder = Vector$Builder;
  package$commonMain.Vector = Vector;
  Invertible.prototype.absSq = MyNumber.prototype.absSq;
  Invertible.prototype.abs = MyNumber.prototype.abs;
  Invertible.prototype.absDouble = MyNumber.prototype.absDouble;
  Invertible.prototype.conj = MyNumber.prototype.conj;
  Invertible.prototype.max_qzel40$ = MyNumber.prototype.max_qzel40$;
  Invertible.prototype.min_qzel40$ = MyNumber.prototype.min_qzel40$;
  Invertible.prototype.pow_za3lpa$ = MyNumber.prototype.pow_za3lpa$;
  Invertible.prototype.getSign = MyNumber.prototype.getSign;
  Rootable.prototype.pow_za3lpa$ = Invertible.prototype.pow_za3lpa$;
  Rootable.prototype.invert = Invertible.prototype.invert;
  Rootable.prototype.absSq = Invertible.prototype.absSq;
  Rootable.prototype.abs = Invertible.prototype.abs;
  Rootable.prototype.absDouble = Invertible.prototype.absDouble;
  Rootable.prototype.conj = Invertible.prototype.conj;
  Rootable.prototype.max_qzel40$ = Invertible.prototype.max_qzel40$;
  Rootable.prototype.min_qzel40$ = Invertible.prototype.min_qzel40$;
  Rootable.prototype.getSign = Invertible.prototype.getSign;
  Algebraic.prototype.sqrt = Rootable.prototype.sqrt;
  Algebraic.prototype.pow_za3lpa$ = Rootable.prototype.pow_za3lpa$;
  Algebraic.prototype.invert = Rootable.prototype.invert;
  Algebraic.prototype.absSq = Rootable.prototype.absSq;
  Algebraic.prototype.abs = Rootable.prototype.abs;
  Algebraic.prototype.absDouble = Rootable.prototype.absDouble;
  Algebraic.prototype.conj = Rootable.prototype.conj;
  Algebraic.prototype.max_qzel40$ = Rootable.prototype.max_qzel40$;
  Algebraic.prototype.min_qzel40$ = Rootable.prototype.min_qzel40$;
  Algebraic.prototype.getSign = Rootable.prototype.getSign;
  MyInt.prototype.absSq = MyNumber.prototype.absSq;
  MyInt.prototype.abs = MyNumber.prototype.abs;
  MyInt.prototype.absDouble = MyNumber.prototype.absDouble;
  MyInt.prototype.conj = MyNumber.prototype.conj;
  MyInt.prototype.max_qzel40$ = MyNumber.prototype.max_qzel40$;
  MyInt.prototype.min_qzel40$ = MyNumber.prototype.min_qzel40$;
  MyInt.prototype.pow_za3lpa$ = MyNumber.prototype.pow_za3lpa$;
  MyInt.prototype.getSign = MyNumber.prototype.getSign;
  MyLong.prototype.absSq = MyNumber.prototype.absSq;
  MyLong.prototype.abs = MyNumber.prototype.abs;
  MyLong.prototype.absDouble = MyNumber.prototype.absDouble;
  MyLong.prototype.conj = MyNumber.prototype.conj;
  MyLong.prototype.max_qzel40$ = MyNumber.prototype.max_qzel40$;
  MyLong.prototype.min_qzel40$ = MyNumber.prototype.min_qzel40$;
  MyLong.prototype.pow_za3lpa$ = MyNumber.prototype.pow_za3lpa$;
  MyLong.prototype.getSign = MyNumber.prototype.getSign;
  MyDouble.prototype.pow_za3lpa$ = Rootable.prototype.pow_za3lpa$;
  MyDouble.prototype.sqrt = Rootable.prototype.sqrt;
  MyDouble.prototype.invert = Rootable.prototype.invert;
  MyDouble.prototype.absSq = Rootable.prototype.absSq;
  MyDouble.prototype.abs = Rootable.prototype.abs;
  MyDouble.prototype.absDouble = Rootable.prototype.absDouble;
  MyDouble.prototype.conj = Rootable.prototype.conj;
  MyDouble.prototype.max_qzel40$ = Rootable.prototype.max_qzel40$;
  MyDouble.prototype.min_qzel40$ = Rootable.prototype.min_qzel40$;
  MyDouble.prototype.getSign = Rootable.prototype.getSign;
  Fraction.prototype.absSq = Invertible.prototype.absSq;
  Fraction.prototype.abs = Invertible.prototype.abs;
  Fraction.prototype.absDouble = Invertible.prototype.absDouble;
  Fraction.prototype.conj = Invertible.prototype.conj;
  Fraction.prototype.max_qzel40$ = Invertible.prototype.max_qzel40$;
  Fraction.prototype.min_qzel40$ = Invertible.prototype.min_qzel40$;
  Fraction.prototype.pow_za3lpa$ = Invertible.prototype.pow_za3lpa$;
  Fraction.prototype.getSign = Invertible.prototype.getSign;
  Complex.prototype.pow_za3lpa$ = Algebraic.prototype.pow_za3lpa$;
  Complex.prototype.sqrt = Algebraic.prototype.sqrt;
  Complex.prototype.absSq = Algebraic.prototype.absSq;
  Complex.prototype.max_qzel40$ = Algebraic.prototype.max_qzel40$;
  Complex.prototype.min_qzel40$ = Algebraic.prototype.min_qzel40$;
  Polar.prototype.pow_za3lpa$ = Algebraic.prototype.pow_za3lpa$;
  Polar.prototype.sqrt = Algebraic.prototype.sqrt;
  Polar.prototype.invert = Algebraic.prototype.invert;
  Polar.prototype.absSq = Algebraic.prototype.absSq;
  Polar.prototype.max_qzel40$ = Algebraic.prototype.max_qzel40$;
  Polar.prototype.min_qzel40$ = Algebraic.prototype.min_qzel40$;
  Polar.prototype.getSign = Algebraic.prototype.getSign;
  Kotlin.defineModule('MathPlus', _);
  return _;
}));

//# sourceMappingURL=MathPlus.js.map
