import csv


a = ['Breathtaking View - the Den of the Treehouse.' ,'https://a0.muscache.com/im/pictures/92217281/44b3a133_original.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/92192702/01ff3c5b_original.jpg?aki_policy=small','https://a0.muscache.com/im/pictures/92241362/9d23d6ac_original.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/92241438/c09b576f_original.jpg?aki_policy=small']
b = ['The Stables Central Coast' ,'https://a0.muscache.com/im/pictures/1b59b175-8356-4282-ac99-ef094289ae47.jpg?aki_policy=small' ,'https://a0.muscache.com/im/pictures/1b907235-3db8-450d-9ec2-b5b1eb96b5a5.jpg?aki_policy=xx_large', 'https://a0.muscache.com/im/pictures/946d4fec-5d89-4841-b582-d079136c9ba5.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/40803f4d-539a-46cf-90ac-8fb0daefd07f.jpg?aki_policy=small']
c = ['Forest Cabin Byron Bay Hinterland' ,'https://a0.muscache.com/im/pictures/17183488/20d13c79_original.jpg?aki_policy=small','https://a0.muscache.com/im/pictures/17183196/d719cbae_original.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/17183268/795c1f23_original.jpg?aki_policy=small','https://a0.muscache.com/im/pictures/17183220/0b519283_original.jpg?aki_policy=small']
d = ['The Copa Cabana', 'https://a0.muscache.com/im/pictures/885da812-a09a-4a0c-aa9e-6b2cf1ba1455.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/124663f2-a251-408f-805f-84640a4ee264.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/35b0f32c-adff-4370-91b9-2ca0a95434d4.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/db980b09-1110-4ac4-bd7e-1e205cd4df92.jpg?aki_policy=small']
e = ['The Tree House', 'https://a0.muscache.com/im/pictures/ed58794e-10c1-4966-bab9-573782fa6f97.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/a7017ab0-1688-4388-aeb6-5c0620f0ec0f.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/de2ac9d8-6940-4310-ab3c-17b61058718d.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/9d1fb5b4-e4de-4e4d-b411-714b447fa040.jpg?aki_policy=small']

f = ['BV · Hunter Valley Barrington Villa Lake/Mountain Views', 'https://a0.muscache.com/im/pictures/93f33caf-c753-4979-99a4-91073c0df255.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/a8502b3a-4163-46db-9e39-1449fc8fc15b.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/a2ee6a7a-8950-4377-a79b-0488d5f38fc1.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/a460bb16-5bd0-42a0-a89a-2ab487da7322.jpg?aki_policy=small']
g = ['Strawbale earth home in the Blue Mountains.', 'https://a0.muscache.com/im/pictures/72037104/ed99b924_original.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/72036962/0429a484_original.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/72037241/c5da700f_original.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/72037036/96cc4e21_original.jpg?aki_policy=small']
h = ['Billabong Cottage on 25 acres', 'https://a0.muscache.com/im/pictures/96210928/05a4e26a_original.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/acfb4a0a-34c6-4e27-ad5f-70f65c13bb67.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/fb157e8f-7bc6-4b21-98e3-099c1e8d164f.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/3cd14f65-b612-410d-a5ef-50a5dc71549b.jpg?aki_policy=small']
i = ['5 mins to Hyams Beach-"Hygge53" Garden flat', 'https://a0.muscache.com/im/pictures/d3b29432-cd1d-4892-8ec7-4d16760949e9.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/d3fb672e-f30b-41ec-b80d-baaaad3e10e1.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/a94495f2-df8e-4744-a04a-8ff90b20bc1f.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/0f2336d5-7cf3-433c-b62b-39ced68624ed.jpg?aki_policy=small']
j = ['5 mins to Hyams Beach-"Hygge53" Garden flat', 'https://a0.muscache.com/im/pictures/9efac6ef-3372-4fd5-97ee-43885d574732.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/0fef3f12-93db-45a1-9e05-3beaf7db635a.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/8d57d92c-6335-4925-b4d3-451b3a8ccc92.jpg?aki_policy=small', 'https://a0.muscache.com/im/pictures/ab9089f5-3075-44b0-b473-e6fc48f2ba13.jpg?aki_policy=small']

title = ['House name', 'p1', 'p2', 'p3', 'p4']
total = [a, b, c, d, e, f, g, h, i, j]
file = open('House_pic4.csv', 'w')
writer = csv.writer(file)
writer.writerow(title)
for i in range(10):
    writer.writerow(total[i])

file.close()
