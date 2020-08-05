import requests
import os
from bs4 import BeautifulSoup
import lxml
import sys
import htmls
import re
import string

import csv
url = "https://www.airbnb.com.au/s/NSW--Australia/homes?refinement_paths%5B%5D=%2Fhomes&current_tab_id=home_tab&selected_tab_id=home_tab&place_id=ChIJDUte93TLDWsRLZ_EIhGvgBc&source=mc_search_bar&search_type=unknown&screen_size=large&hide_dates_and_guests_filters=false&map_toggle=false"
r = requests.get(url)
t = r.text
url_list = []
location_list  = []
house_other_info_list = []
introductoin_list = []
neighbourhood_list = []
house_info_list = []
house_title_list = []
amenities_list = []
sleeping_arr_list = []
house_comment_list = []
neighbourhood_result_list = []
users_list = []
user_source_list = []
House_interior = []
House_exterior = []
Amenities = []
House_pictures = []
Review_list = []
#open the html and start
with open ('into.html') as h:
    soup = BeautifulSoup(h, 'lxml')




'''
The first page data, including 6 elements
'''

#0.Total house amount in NSW is 306
house_amount = soup.find_all(class_ = '_1dss1omb')
house_amount_list = []
for e in house_amount:
    house_info = e.string
    house_amount_list.append(house_info)

#1.the house title, stored in the house_title_list
house_title_list = house_amount_list






#2/3.each house peice has 4 class, from 5 to 616(3 to 615 in coding), each house has two class, including price and number of reviews
house_price = soup.body.find_all(class_ ='_krjbj')
house_review_list = []
house_price_list = []
#2 The price of ezch house
print(type(house_price))
for i in range(3, 615, 2):

    #print(house_price[i].next_sibling)
    house_price_list.append(house_price[i].next_sibling)

print((house_price_list))

#3 the number of reviews for each house
for i in range(4, 615, 2):
    #print(house_price[i].string)
    house_review_list.append(house_price[i].string)

print((house_review_list))



#4.house stars
house_star_list = []
house_stars = soup.find_all(class_ = '_tghtxy2')

count = 0
#print the house star
for e in house_stars:
    #print(e.string)
    house_star_list.append(e.string)

print(house_star_list)
#5.get the img link for each house
houseim = soup.find_all(attrs={'class':'_1df8dftk'})

print(len(houseim))
house_image_list = []




for e in houseim:
    #print(e)
    e_string = str(e)
    #print(e_string)
    e_string = e_string.split('("')
    #print(e_string)
    e_string = e_string[-1]
    #print(e_string)
    #print(type(e_string))
    result = e_string.split('")')[0]
    #print(result)
    #house_image_list.append(result)

#print(house_image_list)
#7.get the house url, preparing the second page

l = soup.find_all(class_ = '_ttw0d')
print(len(l))


for i in range(len(l)):
            #print(l[i])
    url_list.append(l[i].a['href'])
#print(url_list)
print(len(url_list))
#for j in range(len(url_list)):
    #print(str(url_list[j]))

#print(len(url_list))









'''
From here, start to crawl the second page of each house
'''
for i in range(2):
    with open('./htmls/' + str(i) + '.html') as pg0:
    #with open('./htmls/' + '100' + '.html') as pg0:
        soup_pg0 = BeautifulSoup(pg0, 'lxml')
    print("now running" + str(i))


    plus_check = 0

    plus_label = soup_pg0.find_all(class_ = '_3fbupa')
    if not plus_label:
        print("not a plus")
    else:
        print("it is a plus")
        plus_check = 1

    if plus_check == 0:
        #1. the location of the house
        location = soup_pg0.body.find_all(class_ = '_1biqilc')


        location_list.append(location[0].string)



        #2. the 2 status of the house
         # status 1 : house info
        print("----------------------status-------------------------")
        status = soup_pg0.body.find(class_ = '_1p3joamp')
        print(status.string)
        house_info_list.append(status.string)


        '''
        print(status.contents)
        for e in status[0].next_sibling:
    
            print(e.string)
            house_info.append(e.string)
        print(house_info)
         #status 2 : second hot point
        second_info = soup_pg0.body.find_all(class_ = '_504dcb')
        print(len(second_info))
        '''

        status_child = soup_pg0.body.find_all(class_ = '_czm8crp')
        for i in range(1, 4):
            print(status_child[i].string)
            house_info_list.append(status_child[i].string)
        print(house_info_list)
        House_interior.append(house_info_list)
        house_info_list = []
         #status 2 : sparkling clean
        #foursts = soup_pg0.body.find_all(class_ = '_1gw6tte')



        #introduction
        t = soup_pg0.body.find_all(class_ = '_czm8crp')
        #print(len(t))



        for i in range(5, 9):

            #print(t[i].string)
            house_other_info_list.append(t[i].string)

        _6z3til = soup_pg0.body.find_all(class_ = '_6z3til')


        #3.introduction
        print("----------------------introduction-------------------------")
        #print(len(_6z3til))
        for e in _6z3til:
            for ezch in e.contents:
                print(ezch.string)
                introductoin_list.append(ezch.string)
        House_exterior.append(introductoin_list)
        introductoin_list = []

        #4.Amenities
        print("----------------------amentities-------------------------")

        for i in range(10, 13):
            print(t[i].string)
            amenities_list.append(t[i].string)
        Amenities.append(amenities_list)
        print(Amenities)
        amenities_list = []

        '''
        #sleeping arrangements
        print(t[15].string)
        _152qbzi = soup_pg0.body.find_all(class_ = '_152qbzi')
        print(len(_152qbzi))
        if len(_152qbzi) < 1:
            print("check the house information")
        if len(_152qbzi) >= 1:
            print(_152qbzi)
            print(_152qbzi[-1].next_sibling.next_sibling.string)
        sleeping_arr_list.append(_152qbzi[-1].next_sibling.next_sibling.string)
        #comments = comments.find_all(lambda tag: tag.has_attr('data-id') and tag.has_attr('id'))
        '''
        print('--------------------------------image---------------------------')
        img_info = soup_pg0.body.find_all("img", {"class" : "_uttz43"})
        #img_info2 = soup_pg0.body.find_all("img", {"class":"_le7w2kl"})
        house_pic = soup_pg0.body.find_all(class_ = "_1u9fru1")
        print(type(house_pic))

        print((img_info))
        #print(img_info2)
        for a in img_info:

            #print(a['src'])
            house_image_list.append(a['src'])
        House_pictures.append(house_image_list)
        house_image_list = []
        print(House_pictures)


        #Reviews
        aria_valuenow = soup_pg0.body.find_all(class_ = '_1p3joamp')

        #for elem in aria_valuenow:
            #print(elem.string)
        print("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        l = soup_pg0.body.find_all(class_='_16lonkd')
        for i in range(len(l)):
            print('id' + str(i))
            print(l[i]['href'].split('/')[-1])
            print("img source")
            print('img' + l[i].img['src'])
            users_list.append(l[i]['href'].split('/')[-1])
            user_source_list.append(l[i].img['src'])
            print()

        print(len(users_list))
        print(len(user_source_list))
        print("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        #comments

        yu = soup_pg0.body.find_all(class_ = '_czm8crp')

        for i in range(27, 31):
            print(t[i].string)
            house_comment_list.append(t[i].string)
        Review_list.append(house_comment_list)
        house_comment_list = []

        #Neighbourhood
        print("----------------------Neighbourhood-------------------------")

        neighbour = soup_pg0.body.find_all(class_ = '_6z3til')
        egg = neighbour[-1]
        asd = egg.find_all('span')
        #print(asd)
        asd = str(asd[0])
        #print(asd)
        asd = asd.split("<span>")
        #print(asd)
        for e in asd:
            #print(e)
            e = e.split("</span>")
            for get in e:
                print(get)
                neighbourhood_list.append(str(get))
        got = '<span class="_czm8crp">'
        print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
        print(neighbourhood_list)
        if len(neighbourhood_list) > 1:
            neighbourhood_result_list.append(neighbourhood_list[1])
        else:
            neighbourhood_result_list = []
        for goal in neighbourhood_list:
            goal = str(goal)
            string_tag = "_czm8crp"
            result = 0
            result = goal.find(string_tag)
            #print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" + str(result))

            if goal == '<span class="_czm8crp">':
                neighbourhood_list.remove(goal)
            if goal == "<br/>":
                neighbourhood_list.remove(goal)
        neighbourhood_result_list = neighbourhood_list
        print(neighbourhood_result_list)
        neighbourhood_list = []
        neighbourhood_result_list = []






        '''
        eggs = egg.contents[0]
        for i in range(2):
            if eggs.contents is not None:
                eggs = eggs.contents[0]
            else:
                print(eggs.contents[0].string)
        '''
    if plus_check == 1:
        plus_check = 0
        #1.Location of the house: None
        print("PLUS")
        location_list.append('Sydney')


        #2.house info
        _tw4pe52 = soup_pg0.body.find_all(class_ = '_tw4pe52')
        house_info_list.append('PLUS House')
        for i in range(4):
            print(_tw4pe52[i].string)
            house_info_list.append((_tw4pe52[i].string))
        House_interior.append(house_info_list)
        house_info_list = []
        print("----------------------------others-------------------------------")
        _11oyobo = soup_pg0.body.find(class_ ='_11oyobo')
        print(_11oyobo.string)
        house_other_info_list.append(_11oyobo.string)
        for eles in house_other_info_list:
            if eles == None:
                house_other_info_list.remove(eles)
        print(house_other_info_list)
        House_exterior.append(house_other_info_list)
        house_other_info_list = []

        #3. introduction
        _tm3vsk = soup_pg0.body.find(class_ = '_tm3vsk')
        print(_tm3vsk.string)
        introductoin_list.append(_tm3vsk.string)


        #Amenities
        _1gd84tb = soup_pg0.body.find_all(class_ = '_1gd84tb')
        #print(_1gd84tb)
        for e in _1gd84tb:
            amenities_list.append(e.string)
        #print(amenities_list)
        Amenities.append(amenities_list)
        amenities_list = []

        #Location_info
        _1ezjrwzo = soup_pg0.body.find_all(class_ = '_1ezjrwzo')
        print(_1ezjrwzo[3].string)
        neighbourhood_list.append(_1ezjrwzo[3].string)



        #Reviews
        _czm8crp = soup_pg0.body.find_all(class_ = '_czm8crp')
        for int in range(11, 15):
            if str(_czm8crp[int].string) == 'Reviews':
                print("oi")
                for i in range(int + 1, int + 4):
                    print("-----------------------")
                    print(type((_czm8crp[i].string)))
                    print("----------------------")
                    if _czm8crp[i].string != None:

                        house_comment_list.append(str(_czm8crp[i].string))
                    for eles in house_comment_list:
                        if eles == None:
                            house_comment_list.remove(eles)
        Review_list.append(house_comment_list)
        house_comment_list = []

        print(house_comment_list)




print(location_list)
'''
do not forget clean all the list!!!
title = ['name', 'price', 'location', 'id']

name_array = ['a', 'b', 'c', 'd', 'e']
price_array = [100, 200, 300, 400, 500]
location_array = ['brisban', 'Sydney', 'Molben', 'Adlade', 'Perth']
id_array = [1001, 1002, 2003, 2004, 1005]
write_in = []
list = len(name_array)
while list > 0:

    write_in.append([name_array[list - 1], price_array[list - 1], location_array[list - 1], id_array[list - 1]])
    list = list - 1

print(write_in)
file = open('houses.csv', 'w')
writer = csv.writer(file)

writer.writerow(title)
for i in range(5):
    writer.writerow(write_in[i])

file.close()






'''
#The title contains 8 features
#title = ['House Name', 'Location', 'Price', 'Review Number', 'Rating', 'House Interior', 'Amenities', 'Introduction', 'House Img']
title = ['House Name', 'Reviews']



write_in = []
'''
for i in range(1):
    write_in.append([house_title_list[i], location_list[i], house_price_list[i], house_review_list[i], house_star_list[i], House_interior[i], Amenities[i], House_exterior[i], House_pictures[i]])

'''
for i in range(2):
    write_in.append([house_title_list[i], Review_list[i]])

file = open('houses_info.csv', 'w')
writer = csv.writer(file)

writer.writerow(title)
for i in range(2):
    writer.writerow(write_in[i])

file.close()