BEGIN {
    threshold = 50
    count = 0
    rxkBm = 0
    txkBm = 0
}
NR > 3 && !/^Average:/ {
    rxkBs = $5
    txkBs = $6

    if (rxkBs ~ /[0-9.]+/ && txkBs ~ /[0-9.]+/) {
        rxkBm += rxkBs
        txkBm += txkBs
    }
}
END {
    if (rxkBm > threshold * 1024 || txkBm > threshold * 1024) {
        print "alarm"
    }
}