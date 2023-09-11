from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import generics, filters

from .homePageData import HomePageData
from polls.models import Poll
from polls.serializers import PollsSerializers
# Create your views here.

#all the data that would be needed for the client side home page
@api_view(['GET'])
@permission_classes([AllowAny])
def homePageData(request):
    poll_query = HomePageData()
    polls = poll_query.getHomePolls()
    respone_data = {'trending-polls':polls}
    return Response(respone_data,200)

""" @api_view(['GET'])
@permission_classes([AllowAny]) """
class SearchListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Poll.objects.all()
    serializer_class = PollsSerializers
    filter_backends = [filters.SearchFilter]
    search_fields = ['^name', '$name']
