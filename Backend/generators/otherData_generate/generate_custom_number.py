import random

def generate_custom_number(field_name, settings, default_values, decimal_places):
    try:
        min_value, max_value = parse_settings(settings)
        decimal_places = validate_decimal_places(decimal_places)

        if field_name not in default_values:
            default_values[field_name] = {
                'value': generate_initial_value(min_value, max_value, decimal_places),
                'count': 0,
                'direction': 1 
            }

        current_state = default_values[field_name]
        new_value = current_state['value']

        if current_state['count'] >= 10:
            step = generate_step(decimal_places) * current_state['direction']
            new_value = calculate_new_value(new_value, step, min_value, max_value)
            current_state['count'] = 0

            if new_value == max_value:
                current_state['direction'] = -1
            elif new_value == min_value:
                current_state['direction'] = 1

        new_value = round_value(new_value, decimal_places)
        current_state['value'] = new_value
        current_state['count'] += 1

        return new_value

    except ValueError:
        return None

def parse_settings(settings):
    return map(float, settings.split(','))

def validate_decimal_places(decimal_places):
    return int(decimal_places) if decimal_places else None

def generate_initial_value(min_value, max_value, decimal_places):
    return random.uniform(min_value, max_value) if decimal_places else random.randint(int(min_value), int(max_value))

def calculate_new_value(current_value, step, min_value, max_value):
    new_value = current_value + step
    return max(min_value, min(max_value, new_value))

def round_value(value, decimal_places):
    return round(value, decimal_places) if decimal_places else int(value)

def generate_step(decimal_places):
    # สร้าง step ตามทศนิยม
    if decimal_places:
        return round(random.uniform(0.1, 5.0), decimal_places)
    return random.randint(1, 5)


