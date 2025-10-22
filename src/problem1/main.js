var sum_to_n_a = function(n) {
    if (typeof n !== 'number') return 0;
    if (n <= 1) return n;
    if (!sum_to_n_a.memo) {
        sum_to_n_a.memo = new Map();
    }
    if (sum_to_n_a.memo.has(n)) {
        return sum_to_n_a.memo.get(n);
    }
    const result = n + sum_to_n_a(n - 1);
    sum_to_n_a.memo.set(n, result);

    return result;
};

var sum_to_n_b = function(n) {
    if (typeof n !== 'number') return 0;
    if (n <= 1) return n;
    let i = 0;
    let result = 0;
    while (i <= n) {
        result += i;
        i++;
    }
    return result;
};

var sum_to_n_c = function(n) {
    if (typeof n !== 'number') return 0;
    if (n <= 1) return n;
    return ((n + 1) * n) / 2;
};

const testData = [null, '', 'abc', undefined, -10, 0, 1, 5, 10, 15, 50];

const testFn = () => {
    testData.forEach(data => {
        console.log(`sum_to_n_a of ${data} is ${sum_to_n_a(data)}`);
        console.log(`sum_to_n_b of ${data} is ${sum_to_n_b(data)}`);
        console.log(`sum_to_n_c of ${data} is ${sum_to_n_c(data)}`);
        console.log('\n');
    });
}

testFn();