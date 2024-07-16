BEGIN {
    threshold = 50
    count = 0
}
NR > 3 && !/^Average:/ {
    kbactive = $10
    kbinact = $11

    if (kbactive / (kbactive + kbinact) * 100 > threshold) {
        count++
    }
}
END {
    if (count == 3) {
        print "memory", threshold"%"
    }
}