# Cassandra

## GET CASSANDRA USING DOCKER
```
docker pull cassandra:latest
```

## START CASSANDRA
```
docker network create cassandra

docker run --rm -d --name cassandra --hostname cassandra --network cassandra cassandra
```

## CREATE FILES
.
```
-- Create a keyspace
CREATE KEYSPACE IF NOT EXISTS store WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '1' };

-- Create a table
CREATE TABLE IF NOT EXISTS store.shopping_cart (
userid text PRIMARY KEY,
item_count int,
last_update_timestamp timestamp
);

-- Insert some data
INSERT INTO store.shopping_cart
(userid, item_count, last_update_timestamp)
VALUES ('9876', 2, toTimeStamp(now()));
INSERT INTO store.shopping_cart
(userid, item_count, last_update_timestamp)
VALUES ('1234', 5, toTimeStamp(now()));
```

## INTERACTIVE CQLSH
You can use the Image terminal from your Docker Desktop application [Download here](https://www.docker.com/). 
Or simply run the command:

```
docker run --rm -it --network cassandra nuvo/docker-cqlsh cqlsh cassandra 9042 --cqlversion='3.4.5'
```

The result will be:
```
Connected to Test Cluster at cassandra:9042.
[cqlsh 5.0.1 | Cassandra 4.0.4 | CQL spec 3.4.5 | Native protocol v5]
Use HELP for help.
cqlsh>
```

## Now you can read or add some simple data.
```
INSERT INTO store.shopping_cart (userid, item_count) VALUES ('4567', 20);
```


## CLEAN UP 
```
docker kill cassandra
docker network rm cassandra
```


# RUN Code
Inorder to create API and expose for front end side, I choose Expressjs framework and [cassandra-driver](https://www.npmjs.com/package/cassandra-driver) to connect with Cassandra database.

**In server.js**
```
const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1'
});

```

**Run code:**
```
node server.js
```