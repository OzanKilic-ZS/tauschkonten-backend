@echo off
set FUNCTION_NAME=get-customer-cases
set ZIPFILE=get_customer_case.zip

del %ZIPFILE%
powershell -command "Compress-Archive -Path index.mjs,dynamodb.js -DestinationPath %ZIPFILE%"

aws lambda update-function-code --function-name %FUNCTION_NAME% --zip-file fileb://%ZIPFILE%
