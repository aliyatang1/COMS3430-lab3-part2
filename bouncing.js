(function () {
    var playBtn = document.getElementById("playBtn");
    if (!playBtn) {
        return;
    }

    var started = false;

    async function startBouncing() {
        if (started) {
            return;
        }
        started = true;

        var ctx = new (window.AudioContext || window.webkitAudioContext)();

        if (ctx.state === 'suspended') {
            await ctx.resume();
        }

        var startTime = ctx.currentTime;
        var duration = 3; // 3 seconds

        function playBounce(currentTime, height) {
            if (height <= 0) return;

            var period = 0.3 * height;
            var decay = 0.2 * height;
            var amp = 1.0 * height;
            var modIndex = 70 * height;
            var modFreqStart = 80 + 130 * height; // 210 at height=1, 80 at 0

            // Carrier oscillator
            var carrier = ctx.createOscillator();
            carrier.frequency.value = 120;
            carrier.type = 'sine';

            // Modulator oscillator
            var modulator = ctx.createOscillator();
            modulator.frequency.setValueAtTime(modFreqStart, currentTime);
            modulator.frequency.exponentialRampToValueAtTime(80, currentTime + decay);
            modulator.type = 'sine';

            // Modulation gain
            var modGain = ctx.createGain();
            modGain.gain.value = modIndex;

            // Amplitude envelope
            var ampGain = ctx.createGain();
            ampGain.gain.setValueAtTime(amp, currentTime);
            ampGain.gain.exponentialRampToValueAtTime(0.001, currentTime + decay);

            // Connections
            modulator.connect(modGain);
            modGain.connect(carrier.frequency);
            carrier.connect(ampGain);
            ampGain.connect(ctx.destination);

            // Start and stop
            carrier.start(currentTime);
            modulator.start(currentTime);
            carrier.stop(currentTime + decay + 0.1);
            modulator.stop(currentTime + decay + 0.1);

            // Schedule next bounce
            var nextHeight = Math.max(0, 1 - (currentTime + period - startTime) / duration);
            if (nextHeight > 0) {
                setTimeout(function() {
                    playBounce(currentTime + period, nextHeight);
                }, period * 1000);
            }
        }

        // Start first bounce
        playBounce(startTime, 1);
    }

    playBtn.addEventListener("click", startBouncing);
})();