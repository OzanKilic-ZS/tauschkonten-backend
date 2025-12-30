@echo off
set FUNCTION_NAME=create-zstransactions
set ZIPFILE=create_zstransactions.zip

del %ZIPFILE%
powershell -command "Compress-Archive -Path index.mjs,dynamodb.js -DestinationPath %ZIPFILE%"

aws lambda update-function-code --function-name %FUNCTION_NAME% --zip-file fileb://%ZIPFILE%
