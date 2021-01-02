FROM amazon/aws-lambda-python:3.6
ENV PATH = "/root/.local/bin:${PATH}"

RUN pip install --upgrade pip
RUN yum groupinstall "Development Tools" -y
RUN yum install python36-devel -y

RUN git clone https://github.com/smarsland/AviaNZ.git .
RUN pip3 install -r requirements.txt --user
RUN cd ext && python3 setup.py build_ext -i && cd ..

CMD [ "app.lambdaHandler" ]