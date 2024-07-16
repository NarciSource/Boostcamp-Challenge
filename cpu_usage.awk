BEGIN {
    threshold = 70
    count = 0
}
NR > 3 && !/^Average:/ {
    idle = $8
    if (100 - idle > threshold) {
        count++
    }
}
END {
    if (count == 3) {
        print "alarm"
    }
}