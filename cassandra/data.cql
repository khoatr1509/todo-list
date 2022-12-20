-- Create a keyspace
CREATE KEYSPACE IF NOT EXISTS taskList WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '1' };

-- Create a table
CREATE TABLE IF NOT EXISTS taskList.todo_list (
userid text,
taskid int PRIMARY KEY,
task text,
last_update_timestamp timestamp
);

-- Insert some data
INSERT INTO taskList.todo_list
(userid, taskid, task, last_update_timestamp)
VALUES ('1', 1, 'first task today' ,toTimeStamp(now()));
INSERT INTO taskList.todo_list
(userid, taskid, task, last_update_timestamp)
VALUES ('2', 2, 'next task today' ,toTimeStamp(now()));
INSERT INTO taskList.todo_list
(userid, taskid, task, last_update_timestamp)
VALUES ('3', 3, 'last task today' ,toTimeStamp(now()));
