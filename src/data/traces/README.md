# Trick recordings

One CSV per trick, named after the trick you attempted:
`ollie.csv`, `kickflip.csv`, `heelflip.csv`, `bs-shuv.csv`, `fs-shuv.csv`
(add `-2`, `-3` … for extra takes).

Columns: `t_ms,gx,gy,gz` in °/s, on the board axes the firmware uses
(gx = flip axis, gy = pop axis, gz = shove-it axis). A header row is optional.

The quickest way to record: in `loop()` of the firmware, temporarily add

    Serial.printf("%lu,%.1f,%.1f,%.1f\n", millis(), gx, gy, gz);

then do one trick per recording with about half a second of standing still
before and after, and copy the serial output into the file.

As soon as a CSV is here, the site shows the real trace on the SK8Sense page
and in the homepage hero. Without one it shows a schematic.
