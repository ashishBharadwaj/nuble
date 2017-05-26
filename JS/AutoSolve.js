var N = 4;
// A utility function to count inversions in given
// array 'arr[]'. Note that this function can be
// optimized to work in O(n Log n) time. The idea
// here is to keep code small and simple.
function getInvCount(arr) {
    var inv_count = 0;
    for (var i = 0; i < N * N - 1; i++) {
        for (var j = i + 1; j < N * N; j++) {
            // count pairs(i, j) such that i appears
            // before j, but i > j.
            if (arr[j] && arr[i] && arr[i] > arr[j])
                inv_count++;
        }
    }
    return inv_count;
}

// find Position of blank from bottom
function findXPosition(puzzle) {
    // start from bottom-right corner of matrix
    for (var i = N - 1; i >= 0; i--)
        for (var j = N - 1; j >= 0; j--)
            if (puzzle[i][j] == 16)
                return N - i;
}

// This function returns true if given
// instance of N*N - 1 puzzle is solvable
function isSolvable(puzzle) {
    // Count inversions in given puzzle
    var invCount = getInvCount(puzzle);

    // If grid is odd, return true if inversion
    // count is even.
    if (N & 1)
        return !(invCount & 1);

    else // grid is even
    {
        var pos = findXPosition(puzzle);
        if (pos & 1)
            return !(invCount & 1);
        else
            return invCount & 1;
    }
}