FROM conda/miniconda3
ARG FUNCTION_DIR="/function"

# install development dependencies
RUN apt-get update 
RUN apt-get install -y g++ make cmake unzip libcurl4-openssl-dev git

# clone the AviaNZ source code
RUN git clone https://github.com/smarsland/AviaNZ.git ${FUNCTION_DIR}

# install the AviaNZ depencies
WORKDIR ${FUNCTION_DIR}
RUN echo "boto3==1.16.47" >> requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt
RUN conda install ---yes -c conda-forge librosa

# build the Cython dependencies
WORKDIR ${FUNCTION_DIR}/ext
RUN pip install cython numpy==1.16.2
RUN python3 setup.py build_ext -i
WORKDIR /

# add the Lambda runtime / entry
RUN pip install --target ${FUNCTION_DIR} awslambdaric
COPY entry.sh /
ADD https://github.com/aws/aws-lambda-runtime-interface-emulator/releases/latest/download/aws-lambda-rie /usr/bin/aws-lambda-rie
RUN chmod 755 /usr/bin/aws-lambda-rie
RUN chmod 755 /entry.sh

# inject the chordata agent itself
COPY lambda_handler.py ${FUNCTION_DIR}

ENTRYPOINT [ "/entry.sh" ]
CMD [ "lambda_handler.handler" ]
