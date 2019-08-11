# django-api-practice
django x vue.js x RestAPI

# Reference Book
[現場で使えるDjango Rest Frameworkの薄い本](https://booth.pm/ja/items/1314617)

## Make Environment
``` bash
# install pyenv
brew install pyenv

# edit .bash_profile
vi ~/.bash_profile
# add lines
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
# load .bash_profile
source ~/.bash_profile

# install python
pyenv install 3.6.5
pyenv global 3.6.5

# check pyenv-virtualenv
pyenv versions

# install pipenv
brew install pipenv

# install library with pipenv => make Pipfile
pipenv install django djangorestframework pylint

# Add setting.json with VS Code.
// Whether to lint Python files.
"python.linting.enabled": true,
// Whether to lint Python files using pylint.
"python.linting.pylintEnabled": true,
```

## Create Django Project
``` bash
# shell login
pipenv shell
# create django Project
django-admin startproject config .
# create app
python manage.py startapp shop
python manage.py startapp apiv1
```

## Build Setup

``` bash
# migration
python manage.py makemigrations shop
python manage.py migrate
python manage.py createsuperuser
# example: admin / pass12345

# start web server. 
# access to http://localhost:8000/vuejs/api/
python manage.py runserver
```
