import { audioBufferToWavBlob } from './audioBufferToWavBlob';
import { downloadBlob } from './downloadBlob';
import {renderAudio} from './renderAudio'

const buffer = await renderAudio();
const wavBlob = await audioBufferToWavBlob(buffer);
downloadBlob(wavBlob, 'audio.wav');
