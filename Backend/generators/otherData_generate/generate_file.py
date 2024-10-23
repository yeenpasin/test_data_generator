from faker import Faker

fake = Faker()

def generate_file(settings):
    match settings:
        case 'audiofile':
            return fake.file_extension(category='audio')
        case 'imagefile':
            return fake.file_extension(category='image')
        case 'officefile':
            return fake.file_extension(category='office')
        case 'textfile':
            return fake.file_extension(category='text')
        case 'videofile':
            return fake.file_extension(category='video')
        case _:
            return "Invalid settings"