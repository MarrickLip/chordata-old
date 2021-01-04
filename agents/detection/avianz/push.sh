#!/bin/bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 876352702765.dkr.ecr.us-east-1.amazonaws.com
docker tag avianz:latest agents-detection-avianz
docker tag agents-detection-avianz:latest 876352702765.dkr.ecr.us-east-1.amazonaws.com/agents-detection-avianz:latest
docker push 876352702765.dkr.ecr.us-east-1.amazonaws.com/agents-detection-avianz:latest