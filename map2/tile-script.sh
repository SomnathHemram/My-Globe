#!/bin/bash

DEM="your_dem.tif"
OUTPUT_DIR="./terrain"

docker run --rm \
  -v "$(pwd):/data" \
  geodata/generate-terrain \
  --output "/data/terrain" \
  "/data/$DEM"

echo "Terrain tiles generated in: $OUTPUT_DIR"
