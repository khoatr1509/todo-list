import cassandra from 'cassandra-driver';
import { types } from 'cassandra-driver';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1'
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

app.post('/todo_list', (req, res) => {
  console.log('Got body:', req.body);
  let { userId, taskId, task } = req.body;
  const query = `INSERT INTO taskList.todo_list(userid, taskid, task, last_update_timestamp) VALUES( '${userId}', ${taskId}, '${task}', toTimeStamp(now()))`;
  // const query = 'select * from todo.todo_list';
  client.execute(query).then();

  const new_query = `SELECT * FROM taskList.todo_list where taskId = ${taskId}`;
  client.execute(new_query).then((result) => {
    console.log(res.rows);
    res.send(result.rows[0]);
  });
});

app.post('/delete_task', (req, res) => {
  console.log('Got body:', req.body);
  let { taskId } = req.body;
  const query = `delete from taskList.todo_list where taskid = ${taskId};`;
  // const query = 'select * from todo.todo_list';
  client.execute(query).then((result) => {
    res.send(result);
  });
});

app.get('/list', cors(), (req, res) => {
  const query = 'SELECT * FROM taskList.todo_list';
  client.execute(query).then((result) => {
    // console.log(result);
    res.send(result.rows);
  });
});
