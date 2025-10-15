/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
// Fix: Add missing React import.
import React from 'react';

export interface Page {
  id: number;
  title: string;
  // Use React.ReactNode to allow for more complex content like lists and formatting
  content: React.ReactNode;
  narrationText: string;
}

// Fix: Add missing types for video generation feature.
export enum AspectRatio {
  LANDSCAPE = '16:9',
  PORTRAIT = '9:16',
}

export enum Resolution {
  P720 = '720p',
  P1080 = '1080p',
}

export enum VeoModel {
  VEO_FAST = 'veo-fast',
  VEO = 'veo',
}

export enum GenerationMode {
  TEXT_TO_VIDEO = 'Text to Video',
  FRAMES_TO_VIDEO = 'Frames to Video',
  REFERENCES_TO_VIDEO = 'References to Video',
}

export interface FileWithBase64 {
  file: File;
  base64: string;
}

export type ImageFile = FileWithBase64;
export type VideoFile = FileWithBase64;

export interface GenerateVideoParams {
  prompt: string;
  model: VeoModel;
  aspectRatio: AspectRatio;
  resolution: Resolution;
  mode: GenerationMode;
  startFrame: ImageFile | null;
  endFrame: ImageFile | null;
  referenceImages: ImageFile[];
  styleImage: ImageFile | null;
  inputVideo: VideoFile | null;
  isLooping: boolean;
}
