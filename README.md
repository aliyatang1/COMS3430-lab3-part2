# Bouncing Ball Sound Simulation

This code simulates the sound of a bouncing ball using FM synthesis and a decreasing bounce event pattern. This is in line with the principles from "Practical 7: Bouncing" in *Designing Sound*.

## Files

- `bouncing.html` –  HTML page with a button to start the bouncing sound.
- `bouncing.js` – JavaScript implementation using the Web Audio API to generate impact sounds, applying amplitude decay and schedules bounces at progressively shorter intervals.

## How it works

Each bounce is represented as an FM-synthesized impact sound where the carrier oscillator runs at 120 Hz. The modulator sweeps from around 210 Hz down to 80 Hz, so that the bounce's sound dwindles as the bouncing continues. The amplitude, decay time, and bounce period decrease over the course of the simulation, resulting in a sequence of impacts that become quieter, shorter, and closer together similar to the real ball bouncing.

## How to run it

1. Open `bouncing.html` in a web browser
2. Click the "Play Bouncing Sound" button

