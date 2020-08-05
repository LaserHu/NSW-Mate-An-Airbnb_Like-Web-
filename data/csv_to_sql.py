import csv
from random import seed, randint
filename = "houses_info.csv"
table_name = "accommodation"
sql_file = "house.sql"
image_file = "image_file"
def get_vice_image(image_repo, id):
    rand_nums = []
    seed(id)
    for i in range(4):
        rand_nums.append(randint(0, len(image_repo)-1))
    image_list = [image_repo[i] for i in rand_nums]
    return ",".join(image_list)
def generate_guest(id):
    seed(id)
    return randint(2, 6)
with open(filename, 'r') as f, open(sql_file, 'w') as sql_fd, open(image_file, 'r') as image_fd:
    # read images from image repo
    images = [url.strip().strip("\n").strip("\"") for url in image_fd.readlines()]
    print("use proj_demo;", file=sql_fd)
    reader = csv.DictReader(f, delimiter=',')
    id = 1
    index = ['House Name','Location','Price','Review Number','Rating','House Interior','Amenities','Introduction','House Img']
    for row in reader:
        name = row[index[0]].strip().replace("'", "\'\'")
        location = row[index[1]]
        price = row[index[2]].strip().split(" ")[0].strip("$")
        review_nums = row[index[3]].split(" ")[0]
        rating = row[index[4]]
        # deal with interior
        interior = [i.strip().strip("'").replace("\'", "\'\'") for i in row[index[5]].strip('[]').split(',')]
        interior = ",".join(interior)
        # deal with amenties
        amenities = [i.strip().strip("'").replace("\'", "\'\'") for i in row[index[6]].strip('[]').split(',')]
        amenities = ", ".join(amenities)
        # deal with introduction
        introduction = eval(row[index[7]])
        introduction = [i.strip().strip("'").replace("\'", "\'\'") for i in introduction if i]
        introduction = " ".join(introduction)
        # house image list
        main_image = row[index[8]].strip()
        # select a image from image list
        vice_images = get_vice_image(images, id)
        sql = f"INSERT {table_name} (id, name, location, price, review_nums, rating, interior, amenities, guest, main_image, vice_images, introduction)\
VALUES ({id}, \'{name}\', \'{location}\', \'{price}\', {review_nums}, {rating}, \'{interior}\', \'{amenities}\', {generate_guest(id)}, \'{main_image}\', \'{vice_images}\', \'{introduction}\');"
        print(sql, file=sql_fd)
        id+=1
