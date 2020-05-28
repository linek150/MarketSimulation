import datetime
from django.shortcuts import render
from django.urls import reverse_lazy
from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse

# Create your views here.
def index(request):
    if request.user.is_authenticated:
        pass
        #if request.
        #HttpResponseRedirect(reverse('all-borrowed'))
    #Number of visits to this view, as counted in the session variable.
    num_visits=request.session.get('num_visits', 0)
    request.session['num_visits'] = num_visits + 1
    context = {
        'num_visits': num_visits,
    }
    return render(request,'index.html',context=context)

def serviceWorker(request):

    return render(request,'serviceWorker.js')
