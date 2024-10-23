import random
import json
from path_routes import DATA_JSON_PATH

with open(DATA_JSON_PATH, 'r', encoding='utf-8') as file:
    data = json.load(file)

nametitle_choices = data["nametitle_choices"]

def generate_nametitle(settings, include='', exclude='', only=''):

    choices = nametitle_choices.get(settings, [])

    choices = apply_inclusions_exclusions(choices, include, exclude, only)
    return random.choice(choices) if choices else "No valid choices"


def apply_inclusions_exclusions(choices, include, exclude, only):
    # ทำความสะอาด choices ที่ถูกโหลดจาก JSON
    choices = [choice.strip() for choice in choices]

    if include:
        include_items = [item.strip() for item in include.split(',') if item.strip()]
        if include_items:
            # เพิ่มเฉพาะค่าที่ไม่มีอยู่ใน choices
            for item in include_items:
                if item not in choices:
                    choices.append(item)
    if exclude:
        exclude_items = [item.strip() for item in exclude.split(',') if item.strip()]
        choices = [choice for choice in choices if choice not in exclude_items]
    if only:
        choices = [item.strip() for item in only.split(',') if item.strip()]
    return choices