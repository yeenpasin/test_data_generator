from faker import Faker

fake = Faker()

def generate_url(settings):
    if settings == 'URL':
        return fake.url()
    elif settings == 'URI':
        return fake.uri_path()
    elif settings == 'imageURL':
        return fake.image_url() 