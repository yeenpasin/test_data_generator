from faker import Faker

fake = Faker()

def generate_location(settings, field_name):
    lat = fake.latitude()
    lon = fake.longitude()
    
    match settings:
        case 'defaultFormat':
            return {
                f'{field_name}_lat': generate_coordinate_with_direction(lat, ['N', 'S']),
                f'{field_name}_lon': generate_coordinate_with_direction(lon, ['E', 'W'])
            }
        case 'DMS':
            return {
                f'{field_name}_lat': decimal_to_dms(lat, ['N', 'S']),
                f'{field_name}_lon': decimal_to_dms(lon, ['E', 'W'])
            }
        case 'DMM':
            return {
                f'{field_name}_lat': decimal_to_dmm(lat, ['N', 'S']),
                f'{field_name}_lon': decimal_to_dmm(lon, ['E', 'W'])
            }
        case 'DD':
            return {
                f'{field_name}_lat': decimal_to_dd(lat, ['N', 'S']),
                f'{field_name}_lon': decimal_to_dd(lon, ['E', 'W'])
            }

def generate_coordinate_with_direction(value, directions):
    abs_value = round(abs(float(value)), 4)
    direction = 'N' if value >= 0 and 'N' in directions else 'S' if value < 0 and 'S' in directions else 'E' if value >= 0 else 'W'
    return f"{direction}{abs_value}"

def decimal_to_dms(decimal, directions):
    is_positive = decimal >= 0
    decimal = abs(decimal)
    degrees = int(decimal)
    decimal_minutes = (decimal - degrees) * 60
    minutes = int(decimal_minutes)
    seconds = round((decimal_minutes - minutes) * 60, 0)
    
    direction = directions[0] if is_positive else directions[1]
    return f"{degrees}° {minutes}' {seconds} {direction}"


def decimal_to_dmm(decimal, directions):
    is_positive = decimal >= 0
    decimal = abs(decimal)
    degrees = int(decimal)
    minutes = round((decimal - degrees) * 60, 3)
    
    direction = directions[0] if is_positive else directions[1]
    return f"{degrees}° {minutes:.3f}' {direction}"

def decimal_to_dd(decimal, directions):
    is_positive = decimal >= 0
    direction = directions[0] if is_positive else directions[1]
    return f"{abs(decimal):.4f}° {direction}"

# Test the function
if __name__ == "__main__":
    print("DMS:", generate_location('DMS', 'location'))
    print("DMM:", generate_location('DMM', 'location'))
    print("DD:", generate_location('DD', 'location'))