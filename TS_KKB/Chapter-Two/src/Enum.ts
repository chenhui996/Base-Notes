enum HTTP_CODE {
    // key不能是数字，只能是字符
    // value可以是数字和字符串，不能是其他类型的值
    // 数字类型枚举
    // 字符串类型枚举
    OK = 200,
    NOT_FOUND = 404,
    // 默认为0,但是如下不为零，他会是其上一个非字符串的key，的枚举值+1
    METHOD_NOT_ALLOWED
    // 所以它是405
};

// 200
HTTP_CODE.OK;
// 一旦在enum中被确定，将不能再用right引用改值;
// 因为，当前它是一个只读的属性;