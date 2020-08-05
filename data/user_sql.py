sql_file = "users.sql"
table_name = "user"
default_avatar = "https://comp9900-3900-bucket.s3-ap-southeast-2.amazonaws.com/download.jpeg"
from random import randint, seed
with open(sql_file, "w") as sql_fd:
    print("use proj_demo", file=sql_fd)
    for i in range(10):
        content = "I love this room"
        time = "2019-01-02"
        user_id = 16
        sql_statement = f"INSERT {table_name} (id, content, time, user_id) VALUES ({i}, \'{content}\', \'{time}\', {user_id})"
        print(sql_statement, file=sql_fd)
