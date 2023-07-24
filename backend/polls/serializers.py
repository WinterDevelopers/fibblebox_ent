from rest_framework import serializers

from .models import Poll,Candidate,Office

class PollsSerializers(serializers.ModelSerializer):

    class Meta:
        model = Poll
        fields = "__all__"


class CandidateSerializers(serializers.ModelSerializer):

    class Meta:
        model = Candidate
        fields = "__all__"

class OfficeSerializers(serializers.ModelSerializer):

    class Meta:
        model = Office
        fields = "__all__"