FROM python:3.9

WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt ./

RUN pip install -r requirements.txt

RUN pip install channels[daphne]

COPY . .

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
