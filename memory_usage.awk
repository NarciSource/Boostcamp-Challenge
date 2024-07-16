BEGIN {
    threshold = 50
    count = 0
}
NR > 3 && !/^Average:/ {
    memused = $5

    if (memused > threshold) {
        count++
    }
}
END {
    if (count == 3) {
        print "memory", threshold"%"
    }
}