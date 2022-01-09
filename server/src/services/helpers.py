import re
import cloudinary.uploader
import decimal
import datetime

class helpers:
    def __init__(self) -> None:
        pass

    def check_email(self, email):
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        if(re.fullmatch(regex, email)):
            return True
        else:
            return False

    def set_default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        raise TypeError

    def audio_uploader(self, audio, id, filename):
        result = cloudinary.uploader.upload(
            audio, resource_type="raw", folder=f"impulse_responses_spaces/{id}/", public_id=filename)
        return result

    def process_data_types(self,data):
        return_value = []
        for spaces in data:
            for k, v in spaces.items():
                if isinstance(v, decimal.Decimal):
                    v = float(v)
                    return_value.append({k: v})
                elif isinstance(v, datetime.datetime):
                    v = str(v)
                    return_value.append({k: v})
                else:
                    v = str(v)
                    return_value.append({k: v})
        return return_value
