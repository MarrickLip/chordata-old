
ARG FUNCTION_DIR="/function"

FROM python:3.6-buster as build-image

RUN apt-get update
RUN apt-get install -y g++ make cmake unzip libcurl4-openssl-dev git
ARG FUNCTION_DIR

RUN git clone https://github.com/smarsland/AviaNZ.git ${FUNCTION_DIR}
COPY lambda_handler.py ${FUNCTION_DIR}

WORKDIR ${FUNCTION_DIR}
RUN pip install --upgrade pip
RUN echo "awslambdaric==1.0.0" >> requirements.txt 
RUN pip install cython numpy==1.16.2
RUN pip install -r requirements.txt --target .
WORKDIR ${FUNCTION_DIR}/ext
RUN python3 setup.py build_ext -i
WORKDIR /

# Multi-stage build: grab a fresh copy of the base image
FROM python:3.6-buster

ARG FUNCTION_DIR
WORKDIR ${FUNCTION_DIR}
COPY --from=build-image ${FUNCTION_DIR} ${FUNCTION_DIR}

COPY entry.sh /
ADD https://github.com/aws/aws-lambda-runtime-interface-emulator/releases/latest/download/aws-lambda-rie /usr/bin/aws-lambda-rie
RUN chmod 755 /usr/bin/aws-lambda-rie
RUN chmod 755 /entry.sh

ENTRYPOINT [ "/entry.sh" ]
CMD [ "lambda_handler.handler" ]
