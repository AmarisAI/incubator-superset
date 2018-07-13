AmarisSet
=========

[![Build Status](https://travis-ci.org/apache/incubator-superset.svg?branch=master)](https://travis-ci.org/apache/incubator-superset)
[![PyPI version](https://badge.fury.io/py/superset.svg)](https://badge.fury.io/py/superset)
[![Coverage Status](https://codecov.io/github/apache/incubator-superset/coverage.svg?branch=master)](https://codecov.io/github/apache/incubator-superset)
[![PyPI](https://img.shields.io/pypi/pyversions/superset.svg?maxAge=2592000)](https://pypi.python.org/pypi/superset)
[![Join the chat at https://gitter.im/airbnb/superset](https://badges.gitter.im/apache/incubator-superset.svg)](https://gitter.im/airbnb/superset?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Documentation](https://img.shields.io/badge/docs-apache.org-blue.svg)](https://superset.incubator.apache.org)
[![dependencies Status](https://david-dm.org/apache/incubator-superset/status.svg?path=superset/assets)](https://david-dm.org/apache/incubator-superset?path=superset/assets)


**Amaris Set**  is a modern, enterprise-ready
business intelligence web application

[this project used to be named **Caravel**, and **Panoramix** in the past]

How to build & install in Amaris.ai
-----------------------------------

**step one**

you can do it in docker

git clone -b  0.26.1amaris git@github.com:AmarisAI/incubator-superset.git

sudo apt-get install build-essential libssl-dev libffi-dev python3.5-dev python-pip libsasl2-dev libldap2-dev libmysqlclient-dev python-dev

**step two**

pip install -r requirements.txt

python set.py install

cd incubator-superset/dist

easy_install amaris-0.999.0.dev0-py2.7.egg

**step three**

fabmanager create-admin --app amaris

amaris db upgrade

amaris init

amaris runserver -p 1234

Screenshots & Gifs
------------------

**View Dashboards**

<kbd><img title="View Dashboards" src="https://raw.githubusercontent.com/apache/incubator-superset/master/superset/assets/images/screenshots/bank_dash.png"></kbd><br/>

**Slice & dice your data**

<kbd><img title="Slice & dice your data" src="https://raw.githubusercontent.com/apache/incubator-superset/master/superset/assets/images/screenshots/explore.png"></kbd><br/>

**Query and visualize your data with SQL Lab**

<kbd><img title="SQL Lab" src="https://raw.githubusercontent.com/apache/incubator-superset/master/superset/assets/images/screenshots/sqllab.png"></kbd><br/>

**Visualize geospatial data with deck.gl**

<kbd><img title="Geospatial" src="https://raw.githubusercontent.com/apache/incubator-superset/master/superset/assets/images/screenshots/deckgl_dash.png"></kbd><br/>

**Choose from a wide array of visualizations**

<kbd><img title="Visualizations" src="https://raw.githubusercontent.com/apache/incubator-superset/master/superset/assets/images/screenshots/visualizations.png"></kbd><br/>

Amaris Set
---------------
Amaris Set is a data exploration and visualization web application.

Superset provides:
* An intuitive interface to explore and visualize datasets, and
    create interactive dashboards.
* A wide array of beautiful visualizations to showcase your data.
* Easy, code-free, user flows to drill down and slice and dice the data
    underlying exposed dashboards. The dashboards and charts acts as a starting
    point for deeper analysis.
* A state of the art SQL editor/IDE exposing a rich metadata browser, and
    an easy workflow to create visualizations out of any result set.
* An extensible, high granularity security model allowing intricate rules
    on who can access which product features and datasets.
    Integration with major
    authentication backends (database, OpenID, LDAP, OAuth, REMOTE_USER, ...)
* A lightweight semantic layer, allowing to control how data sources are
    exposed to the user by defining dimensions and metrics
* Out of the box support for most SQL-speaking databases
* Deep integration with Druid allows for Superset to stay blazing fast while
    slicing and dicing large, realtime datasets
* Fast loading dashboards with configurable caching


Database Support
----------------

Superset speaks many SQL dialects through SQLAlchemy, a Python
ORM that is compatible with
[most common databases](http://docs.sqlalchemy.org/en/rel_1_0/core/engines.html).

Superset can be used to visualize data out of most databases:
* MySQL
* Postgres
* Vertica
* Oracle
* Microsoft SQL Server
* SQLite
* Greenplum
* Firebird
* MariaDB
* Sybase
* IBM DB2
* Exasol
* MonetDB
* Snowflake
* Redshift
* **more!** look for the availability of a SQLAlchemy dialect for your database
  to find out whether it will work with Superset


Druid!
------

On top of having the ability to query your relational databases,
Superset ships with deep integration with Druid (a real time distributed
column-store). When querying Druid,
Superset can query humongous amounts of data on top of real time dataset.
Note that Superset does not require Druid in any way to function, it's simply
another database backend that it can query.

Here's a description of Druid from the http://druid.io website:

*Druid is an open-source analytics data store designed for
business intelligence (OLAP) queries on event data. Druid provides low
latency (real-time) data ingestion, flexible data exploration,
and fast data aggregation. Existing Druid deployments have scaled to
trillions of events and petabytes of data. Druid is best used to
power analytic dashboards and applications.*
