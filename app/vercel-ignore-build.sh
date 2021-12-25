#!/bin/bash

echo "VERCEL_ENV: $VERCEL_ENV"

if [[ "$REACT_APP_VERCEL_GIT_COMMIT_REF" == "master" ]] ; then
  # Proceed with the build
  echo "✅ - Build can proceed"
  exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi