#!/bin/sh
# Check if the directory is empty
if [ -z "$(ls -A . | grep -v node_modules)" ]; then
    # Create a new Angular project if the directory is empty
    ng new angular-app --directory . --routing --style scss --strict --standalone --view-encapsulation ShadowDom --ssr false --interactive false
    npm install
else
    # If the directory is not empty, just ensure dependencies are installed
    npm install
fi
# Start the Angular development server
ng serve --host 0.0.0.0 --port 4200