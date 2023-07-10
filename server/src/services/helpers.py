import re
import cloudinary.uploader
import decimal
import datetime


class Helpers:
    @staticmethod
    def check_email(email):
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        return bool(re.fullmatch(regex, email))

    @staticmethod
    def set_default(obj):
        if isinstance(obj, set):
            return list(obj)
        raise TypeError

    @staticmethod
    def audio_uploader(audio, id, filename):
        return cloudinary.uploader.upload(audio, resource_type="raw", folder=f"impulse_responses_spaces/{id}/", public_id=filename)

    @staticmethod
    def process_data_types(data):
        return_value = []
        for spaces in data:
            for k, v in spaces.items():
                if isinstance(v, (decimal.Decimal, datetime.datetime)):
                    v = str(v)
                else:
                    v = str(v)
                return_value.append({k: v})
        return return_value
