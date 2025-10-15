/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-10 h-10 border-4 border-t-transparent border-pink-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-pink-800 text-center">
        Gerando narração para o guia...
      </p>
    </div>
  );
};

export default LoadingIndicator;
