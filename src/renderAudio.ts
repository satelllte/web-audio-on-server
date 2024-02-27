export const renderAudio = async (): Promise<AudioBuffer> => {
  const sampleRate = 44100;
  const duration = 2;
  const context = new OfflineAudioContext(2, sampleRate * duration, sampleRate);
  const now = context.currentTime;

  const oscillator = new OscillatorNode(context, {
    frequency: 110,
    type: 'sine',
  });

  oscillator.connect(context.destination);

  oscillator.start(now);
  oscillator.stop(now + duration - 0.1);

  oscillator.onended = () => {
    oscillator.disconnect();
  };

  const buffer = await context.startRendering();
  return buffer;
};
