export function flatten(arr) {
    return [].concat(...arr.map(item => [].concat(item, ...flatten(item.tags))))
}

export function flattenArr(arr) {
    let newArr = [];
    arr.forEach((val) => {
        if (val instanceof Array) {
            newArr = newArr.concat(flattenArr(val))
        } else {
            newArr.push(val)
        }
    })
    return newArr;
}

export function darkSearchBookMark(self) {
    // 进行模糊搜索
    self.fuseResult = self.fuse.search(self.searchInputVal);
    // 调用父组件的 get 函数,用于获取该子组件输入框输入的的值
    self.$emit('getSearchInputVal', self.searchInputVal);
    // 如果模糊搜索结果大于 0, 调用父组件的 get 函数,用于获取该子组件模糊搜索的结果
    if (self.fuseResult.length > 0) {
        self.$emit('getFuseResult', self.fuseResult);
    }
    // 调用父组件的 get 函数,用于计算模糊搜索之后那些书签可见那些书签不可见
    self.$emit('getVisibleBookMarkObj');
    // 调用父组件函数, 将模糊搜索结果的 item 值合并成一个数组
    self.$emit('fuseJsResultDisplay');
}