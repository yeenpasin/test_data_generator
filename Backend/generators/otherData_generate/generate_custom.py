import random

def generate_custom(pattern):
    char_map = {'@': 'abcdefghijklmnopqrstuvwxyz', '%': 'กขฃคฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮ', '#': '0123456789'}
    return ''.join(random.choice(char_map.get(char, char)) for char in pattern)