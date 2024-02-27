export const audioBufferToWavBlob = (buffer: AudioBuffer): Blob => {
  const {numberOfChannels, sampleRate} = buffer;
  const interleavedBuffer = new Float32Array(buffer.length * numberOfChannels);

  for (let channel = 0; channel < numberOfChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < buffer.length; i++) {
      interleavedBuffer[i * numberOfChannels + channel] = channelData[i];
    }
  }

  const dataView = encodeWav(interleavedBuffer, numberOfChannels, sampleRate);
  const blob = new Blob([dataView], {type: 'audio/wav'});
  return blob;
};

const encodeWav = (
  interleavedBuffer: Float32Array,
  numberOfChannels: number,
  sampleRate: number,
): DataView => {
  const buffer = new ArrayBuffer(44 + interleavedBuffer.length * 2);
  const dataView = new DataView(buffer);
  writeString(dataView, 0, 'RIFF');
  dataView.setUint32(4, 36 + interleavedBuffer.length * 2, true);
  writeString(dataView, 8, 'WAVE');
  writeString(dataView, 12, 'fmt ');
  dataView.setUint32(16, 16, true);
  dataView.setUint16(20, 1, true);
  dataView.setUint16(22, numberOfChannels, true);
  dataView.setUint32(24, sampleRate, true);
  dataView.setUint32(28, sampleRate * numberOfChannels * 2, true);
  dataView.setUint16(32, numberOfChannels * 2, true);
  dataView.setUint16(34, 16, true);
  writeString(dataView, 36, 'data');
  dataView.setUint32(40, interleavedBuffer.length * 2, true);
  floatTo16BitPCM(dataView, 44, interleavedBuffer);
  return dataView;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const floatTo16BitPCM = (
  dataView: DataView,
  offset: number,
  buffer: Float32Array,
): void => {
  for (let i = 0; i < buffer.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, buffer[i]));
    dataView.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
};

const writeString = (
  dataView: DataView,
  offset: number,
  string: string,
): void => {
  for (let i = 0; i < string.length; i++) {
    dataView.setUint8(offset + i, string.charCodeAt(i));
  }
};
